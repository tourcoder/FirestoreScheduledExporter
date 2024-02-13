const fs = require('fs');
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseconfig/your_firebase_config_file.json');

// initial Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore
const db = admin.firestore();

// Default: each 24 hours
const intervalInMilliseconds = 24 * 60 * 60 * 1000;

// Download the data
async function downloadData() {
  try {

    // Get current date
    function getCurrentDateString() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    // Create the folder named with current date
    const dataFolderPath = `./data/${getCurrentDateString()}`;

    // Create the folder if not exist
    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath, { recursive: true });
    }

    const collections = await db.listCollections();

    // Iterate over each collection
    for (const collectionRef of collections) {
      const collectionName = collectionRef.id;
      const dataFilePath = `${dataFolderPath}/${collectionName}.json`; // path

      // Get the data from collections
      const snapshot = await collectionRef.get();

      // Save data into the files
      const data = [];
      snapshot.forEach(doc => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); // write the data into files
    }
    console.log('All data downloaded and saved successfully.');

  } catch (error) {
    console.error('Error downloading data:', error);
  }
}

// timer
setInterval(downloadData, intervalInMilliseconds);