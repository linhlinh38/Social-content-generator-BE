import admin from 'firebase-admin';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var serviceAccount = require("D:/visual code/social-content-generator-api/social-content-generator-firebase-adminsdk-b2o4a-acf4780951.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const db = admin.firestore();
