import express from 'express';
import * as admin from 'firebase-admin';

var cors = require('cors')

const bodyParser = require('body-parser')
const serviceAccount = require('./config/firebase-config.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = firebase.firestore();
const auth = firebase.auth()
firestore.settings({ ignoreUndefinedProperties: true })

app.use("/user", (<div>Hello user</div>))
app.use("/mock", (<div>Hello mock</div>))

export { auth, firestore };
