# FirestoreScheduledExporter
Schedule data exports from Firebase's Cloud Firestore

### What is this?
This is a scheduled data export feature for Cloud Firestore, as Firebase's data export and import functions require an upgrade. Since I only needed to export data for a personal application hosted on Firebase, I developed this functionality to export Cloud Firestore data on a regular basis.

### Implementation
A timer is set up to periodically iterate through collections in Firestore, download their data, and save it onto a VPS.

### Configuration
The code is extensively commented, allowing for easy customization according to individual requirements. For example:

```
const intervalInMilliseconds = 24 * 60 * 60 * 1000;
```

By default, it runs every 24 hours but can be modified to any desired interval.

```
const dataFilePath = `${dataFolderPath}/${collectionName}.json`; // path
```

This path can also be adjusted as needed.

### Suggestion
Consider using dotenv for managing environment variables like serviceAccount:

```
require('dotenv').config();
const serviceAccount = require(process.env.FIREBASE_CONFIG_PATH);
```

This approach provides better security and flexibility.

### Notice
The timer utilizes setInterval, which may not always be precise. Consider using alternative timer packages for more accuracy.

### License && Feedback
Please don't hesitate to submit issues. The license is under MIT.

