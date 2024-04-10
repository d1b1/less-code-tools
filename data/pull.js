// Import the Airtable package
const Airtable = require('airtable');
const fs = require('fs');
const axios = require('axios');
const _ = require('lodash');

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

// const imageUrl = 'https://example.com/image.jpg';
// const savePath = './downloaded_image.jpg';

// downloadImage(imageUrl, savePath)
//   .then(() => console.log('Image downloaded successfully'))
//   .catch((error) => console.error('Error downloading image:', error));

  
// Configure Airtable with your API key and base ID
const apiKey = 'patJ8x7xdGTz7NjC3.a6592bb96792035dd252b68400aef1ebf715d3cdebb4889c90b70650cacf247a';
const baseId = 'appBE9zWoLBRpXaoX';
const tableName = 'tbln3ndJt0r3lom2C';

// Initialize Airtable
const base = new Airtable({ apiKey: apiKey }).base(baseId);

const data = [];

// Fetch records from the specified table
base(tableName).select({
    // Add any filters or sorting options here
}).eachPage(async (records, fetchNextPage) => {

    var p = []
    // Process the records
    records.forEach((record) => {
       record.fields = _.mapKeys(record.fields, (v, k) => _.camelCase(k));
       record.fields.objectID = record.id;

       if (record.fields.logo && record.fields.logo.length > 0) {
          let url = record.fields.logo[0].url
          let ext = record.fields.logo[0].type.split('/')[1];
          let savePath = `./logos/${record.fields.objectID}.${ext}`;
          record.fields.logo = `${record.fields.objectID}.${ext}`;

          // console.log(record.fields.logo)
          p.push(downloadImage(url, savePath));
        }

       // console.log(record.fields)
        data.push(record.fields);
    });
 
    await Promise.all(p);

    // Fetch the next page of records, if any
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

