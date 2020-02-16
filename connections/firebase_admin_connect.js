var admin = require("firebase-admin");

var serviceAccount = require("../project-147df-firebase-adminsdk-bg97v-fd0adceea6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-147df.firebaseio.com"
});

var db = admin.database();

module.exports = db;