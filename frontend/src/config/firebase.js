import { getAuth } from "firebase/auth";
import { initializeApp, getApp } from "firebase/app";
// import { firebase } from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBMJbf-AX1HqXOFf9_bd9CNd0JR237bv68",
  authDomain: "metacentraland.firebaseapp.com",
  projectId: "metacentraland",
  storageBucket: "metacentraland.appspot.com",
  messagingSenderId: "569703908261",
  appId: "1:569703908261:web:254a704967b93841099e4c",
};

//   export const uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: '/home',
//     signInOptions: [
//       firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
//     ],

//   };

initializeApp(firebaseConfig);
const firebaseApp = getApp();
const auth = getAuth();

export { firebaseApp, auth };
