
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB8S8i5iXpliDj6AezZUYoZO3zZUH659oQ",
    authDomain: "sewzee-79835.firebaseapp.com",
    projectId: "sewzee-79835",
    storageBucket: "sewzee-79835.appspot.com",
    messagingSenderId: "516705212434",
    appId: "1:516705212434:web:56a343f8c07fca22e2e0cb",
    measurementId: "G-5RG29RH7FC"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);