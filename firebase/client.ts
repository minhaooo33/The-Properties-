// Import the functions you need from the SDKs you need
import { initializeApp ,getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRNUhhRCp9sfMRPWTVHuYcWNqpHgqQrs8",
  authDomain: "foodorderhubadmin.firebaseapp.com",
  projectId: "foodorderhubadmin",
  storageBucket: "foodorderhubadmin.firebasestorage.app",
  messagingSenderId: "640096621581",
  appId: "1:640096621581:web:c45f51117836f1b865b144"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if(!currentApps.length){
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
}else{
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };