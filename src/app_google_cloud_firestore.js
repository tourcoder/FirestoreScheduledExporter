const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs').promises;

// Configure Firestore
const firestore = new Firestore({
  projectId: 'google cloud project ID',
  keyFilename: './service-account.json',
  databaseId: 'database ID',
});

// Asynchronous function to export data
async function exportFirestoreData() {
  try {
    // Get a list of all collections
    const collections = await firestore.listCollections();
    
    // Create an object to store all data
    const allData = {};

    // Iterate through each collection
    for (const collection of collections) {
      const collectionId = collection.id;
      console.log(`Exporting collection: ${collectionId}`);

      // Retrieve all documents in the collection
      const snapshot = await firestore.collection(collectionId).get();
      
      // Store document data in the object
      allData[collectionId] = {};
      
      snapshot.forEach(doc => {
        allData[collectionId][doc.id] = doc.data();
      });
    }

    // Write data to a file
    const outputFile = 'firestore-export.json';
    await fs.writeFile(outputFile, JSON.stringify(allData, null, 2));
    
    console.log(`Data successfully exported to ${outputFile}`);
    
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}

// Execute export
exportFirestoreData();
