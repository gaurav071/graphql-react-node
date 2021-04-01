import firebase from "firebase";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBRu8ySzbQO1vZl-lTFNgqpd7ZCYLNW-J0",
  authDomain: "graphql-react-node-8eeea.firebaseapp.com",
  projectId: "graphql-react-node-8eeea",
  storageBucket: "graphql-react-node-8eeea.appspot.com",
  appId: "1:142683157141:web:7c9f8daba695923d4fe19c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
