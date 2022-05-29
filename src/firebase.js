import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxXe2fqICON3m5RZZYQU5j5-ftAs1Y0Ss",
  authDomain: "my-wallet-be092.firebaseapp.com",
  projectId: "my-wallet-be092",
  storageBucket: "my-wallet-be092.appspot.com",
  messagingSenderId: "63189051610",
  appId: "1:63189051610:web:859c7a0a546e771c209de3",
  measurementId: "G-D9NLXHGSKE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);