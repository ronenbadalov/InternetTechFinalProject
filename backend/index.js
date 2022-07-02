import userRoutes from "./routes/User.js";
import landRoutes from "./routes/Land.js";
import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "metacentraland",
    private_key_id: "cc89cb95b3907870196fb868a26c9716c06c7404",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDsXYnBtbOTMYbN\n125bYU189tS3yc7KULogKFaXLznTZelXprpy3oMl+WnqFjlWO7iLBoGcM0/b4idw\nkUbcPKwx8cfu9mqMMu890N/xmQO0pP2ziOHteDUPDKfOzk8HvnUk+H0b9feK3Kyg\n0oWNhpHvqL1jTcH1IuOx0syYRbSmhNQW3fXg27JQ82m9N3k/Ik8KdVCpppB+I7L+\nhviOFt3j8afEu16FDdYaH3jVvRwm5EP72orQaW+NVl5JtCugKQJhBYNU1dYG2WQ8\nxHsxDWn+nw2TCkxLnA9Es6LIydBPNBqrUlA/2izQP+TwrDVivhequTkZD3I8Qtuc\nfzT1My6rAgMBAAECggEAAXcIVeP7rq1eLN7Q1hgUGktKu/6SooAlW3w0hOEiA8+Z\nstVqSglHtrwKH2/M02gJvJUB21YF7Rx11x5E7eUOhxYabe/EqiLJmry/VfdZyBsd\nONDCVgZ+IRRnRRYPG5Fy5eJqso3cJFX/HPzUvLDve8YM2Tf8Hroaq4+YfRwLB7VT\nTnr4bXGyaGugTXzycU8+wTiyroqACa+ZI9durcVjMm3Y1is7jZ2Kaq6Ca1SweHa2\nJ76nVhx/lKYCrg/i10JEHJQCoPsYS2UEZUZybrl2P4N6Gq3CDnq4xcmR/gfXddzp\n6XnxrLraR7albQbfZBsqfm5ZtB9LLkhJBU44OByzSQKBgQD8ZrmDDVpKvivOLy26\nokmiNdLsfqSA9ObSS326TIbeBI6cB8EL+QQbSuwLa4jrqCv7OugcSKpO1zrUNrBW\niDXxtQSkPV+TrNloWlPv0S96nddHU/J/uSS9ZgjDybWkPE2g6FOX8rqGDJYpjB0I\neEopB/bw+EiU1HFg2RMdkylh6QKBgQDvvEgjvGxWEh2qOIf7fNP7AHdOCBWlPz5x\nHI5n2F32un1r3VGqRVfV3d09FXC+yPlLQPVWgs8Nwo7cX042vQezzyXBc5pluXqy\nz2nR+ZFBsFDZzpvO2LVQC8fIcB5C/0vw8m07gBuMbA6g6RX6Y3jc1LHb6cDhZ90q\ni0asWP+7cwKBgQD8IrIXFHOqTqb75W1ND2l3PUVjMm+q0vryAK+sN15S00KS47wY\n9b0AdquuDNJOd0TYR1QvTPe0opUGAUvOZWtd9XKZjyW3I+haskE/RDylxJ+VhWqt\n5ImrGg6PZySo2ATERNGc7MEfv9sRzgICwAd1TZuFxMDczAwmrzLFTIj+YQKBgQCl\nUveAxXEEjius9p04HiZlgzXDNyoOMiYShPnjvT9XZdYWa6LkxDtFfmISvNVqjFf2\nwI4wIbc+KvywFn1unD9SjbjgxqMkIZvu8cBtEClO3pNzENs78xBeajFVFZSY6Uvq\nlpQjoz3cQax45STF7pEr4PXizTm5eBH6Q9/x/NIm5wKBgQCcaHeoe1cmZFh3vQzS\n7dvq7M3xEL2fNpYLda+w1k46X0ihv2UwIx4jX+uJT+yNcHPF0VdmD0qipmOwLXTm\n/JpJdIEAmq7nMMJhhA9gLbk0x6S1XvuWgFGh33hrugoM+1Nec67qg2waa4kaCvKT\ncBjCiVFpL1h/b9P1Mjg1JHJzow==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-yrrei@metacentraland.iam.gserviceaccount.com",
    client_id: "112318254365817434930",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yrrei%40metacentraland.iam.gserviceaccount.com",
  }),
});

const firestore = firebase.firestore();
const auth = firebase.auth();

app.use("/user", userRoutes);
app.use("/land", landRoutes);

export { firestore, auth };
