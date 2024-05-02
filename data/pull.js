require('dotenv').config();
const Airtable = require('airtable');
const fs = require('fs');
const axios = require('axios');
const _ = require('lodash');
const algoliasearch = require('algoliasearch');
const { imageUpload } = require('../scratch/index.js');
const async = require('async');

// create a queue object with concurrency 2
var ghQueue = async.queue(function(task, callback) {
  console.log('hello ' + task.name);
  storeImage(task.url, 'less-code/logos', task.name).then(callback);
}, 1);

// assign a callback
ghQueue.drain(function() {
  console.log('all items have been processed');
});

// Initialize Airtable client.
const airTableBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

// Initialize the Algolia client.
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const AlgoliaIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

/* Old function that downloaded for local use. */
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

async function downloadImageV2(url) {
  const response = await axios({
    url: url,
    responseType: 'arraybuffer'
  });

  return Buffer.from(response.data, 'binary').toString('base64');
}

async function storeImage(url, path, name) {
  try {
    console.log('Getting', path, name);
    const base64Image = await downloadImageV2(url);

    console.log('Storing in Github')
    return await imageUpload(base64Image, path, name);

  } catch (error) {
    console.error('Error in executing image operations:', error);
  }
}

// Initialize Airtable
const data = [];

// Fetch records from the specified table
airTableBase(process.env.AIRTABLE_TABLE_NAME).select({
    // Add any filters or sorting options here
}).eachPage(async (records, fetchNextPage) => {

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
          // uploadImage(imagePath, 'less-code/logos', 'testFile111.png');

          ghQueue.push({ url: url, path: 'less-code/logos', name: `${record.fields.objectID}.${ext}`});

          // p.push(storeImage(url, 'less-code/logos', `${record.fields.objectID}.${ext}`));
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

    console.log('All done. You have a new output file.');
    
    fs.writeFile('./output.json', JSON.stringify(data, ), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('JSON data saved to', data.length);
        }
    });
});

