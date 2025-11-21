// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

// Usar las variables de entorno definidas en el archivo .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_FIREBASE_APP_ID!
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos todo lo que vamos a usar
export {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy
};
