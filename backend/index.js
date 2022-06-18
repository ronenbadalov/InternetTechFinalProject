
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const serviceAccount = require('./config/firebase-config.json');


const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

initializeApp({
  credential: cert(serviceAccount)
});

const firestore = getFirestore();

//const auth = firebase.auth();
//firestore.settings({ ignoreUndefinedProperties: true });

// app.use("/user", ("<div>Hello user</div>"));
// app.use("/mock", ("<div>Hello mock</div>"));

//export { auth, firestore };
