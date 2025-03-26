const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require ("firebase/storage");


const firebaseConfig = {
    apiKey: "AIzaSyAXCnzLYZsancnlkG9irdxHGzybiMcEDJM",
    authDomain: "estagio-functions.firebaseapp.com",
    projectId: "estagio-functions",
    storageBucket: "estagio-functions.firebasestorage.app",
    messagingSenderId: "88431278635",
    appId: "1:88431278635:web:8e266f76a7f6daae3d886e",
    measurementId: "G-RHG09JS1WM"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

module.exports = { db, storage};