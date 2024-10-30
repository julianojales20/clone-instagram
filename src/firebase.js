import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBxHm9YWZpp0aDsJAoIOjc7YQrWOh2UENI",
  authDomain: "instagram-clone-curso-ad4b5.firebaseapp.com",
  projectId: "instagram-clone-curso-ad4b5",
  storageBucket: "instagram-clone-curso-ad4b5.appspot.com",
  messagingSenderId: "773089308054",
  appId: "1:773089308054:web:e1631df8ec7050648c81b7",
  measurementId: "G-GBC63LPDTH"
});

// Iniciando os serviços com a abordagem modular
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const functions = getFunctions(firebaseApp);

export { db, auth, storage, functions };
