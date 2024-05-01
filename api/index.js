const express = require('express');
const app = express();
const Airtable = require('airtable');
const fs = require('fs');
const axios = require('axios');
const _ = require('lodash');
const algoliasearch = require('algoliasearch');

require('dotenv').config();

app.get('/import', (req, res) => {

    console.log('Starting import');

    // Initialize Airtable client.
    const airTableBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

    // Initialize the Algolia client.
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    const AlgoliaIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

    const downloadImage = async (url, filePath) => {
        try {
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    // Initialize Airtable
    const data = [];

    // Fetch records from the specified table
    airTableBase(process.env.AIRTABLE_TABLE_NAME).select(
        {}
    ).eachPage(async (records, fetchNextPage) => {

        var p = []
        var ap = []

        // Process the records
        records.forEach((record) => {
            record.fields = _.mapKeys(record.fields, (v, k) => _.camelCase(k));
            record.fields.objectID = record.id;

            if (record.fields.logo && record.fields.logo.length > 0) {
                let url = record.fields.logo[0].url
                let ext = record.fields.logo[0].type.split('/')[1];
                let savePath = `./logos/${record.fields.objectID}.${ext}`;
                record.fields.logo = `${record.fields.objectID}.${ext}`;
                // p.push(downloadImage(url, savePath));
            }

            ap.push(record.fields)
            data.push(record.fields);
        });

        // Force the index to run.
        await AlgoliaIndex.saveObjects(ap).then(({ objectIDs }) => {
            console.log('Data pushed to Algolia:', objectIDs);
        }).catch(err => {
            console.error('Error pushing data to Algolia:', err);
        });

        // Force the save to run.
        await Promise.all(p);

        // Fetch the next page of records, if any.
        fetchNextPage();

    }, (err) => {
        if (err) {
            console.error('Error fetching records:', err);
        }

        console.log(`All done. Processed ${data.length} records.`);
        res.send(`All done. Processed ${data.length} records.`);

        // fs.writeFile('./output.json', JSON.stringify(data,), (err) => {
        //     if (err) {
        //         console.error('Error writing file:', err);
        //     } else {
        //         console.log('JSON data saved to', data.length);
        //     }
        // });
    });


});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
