import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs,doc, updateDoc,deleteDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCnZnkj-3Bj3uUdi__jNba2weldz7NlHPg",
  authDomain: "global-mobile-e6ad8.firebaseapp.com",
  projectId: "global-mobile-e6ad8",
  storageBucket: "global-mobile-e6ad8.appspot.com",
  messagingSenderId: "607438018466",
  appId: "1:607438018466:web:02731aec64c78f733604fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)

export {app,db,getFirestore,collection, addDoc, getDocs,doc,updateDoc, deleteDoc}