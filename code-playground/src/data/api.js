import { initializeApp } from "firebase/app";
import { getDateTime } from "../utils/Utils";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlOkHJymlsqdrAIoeb4tbimuc7Wca35rA",
  authDomain: "code-playground-459fe.firebaseapp.com",
  projectId: "code-playground-459fe",
  storageBucket: "code-playground-459fe.appspot.com",
  messagingSenderId: "184817370509",
  appId: "1:184817370509:web:d9b316efb057e20178a9c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const sessionRef = collection(db, "sessions");

async function getAllSessions() {
  try {
    const querySnapshot = await getDocs(sessionRef);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.log("Error: ", e);
  }
}

async function addCode() {
  try {
    const docRef = await addDoc(sessionRef, {
      code: "Start Coding!",
      createdDateTime: getDateTime(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getUser(userName, password) {
  try {
    const q = query(
      sessionRef,
      where("userName", "==", userName),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {}
}

async function updateCodeDoc(code, sessionId) {
  try {
    const updateDocRef = doc(db, "sessions", sessionId);
    await updateDoc(updateDocRef, {
      code: code,
      lastUpdated: getDateTime(),
    });
  } catch (e) {}
}

async function getCode(sessionId) {
  try {
    const snap = await getDoc(doc(db, "sessions", sessionId));
    if (snap.exists) {
      return snap.data();
    }
  } catch (e) {}
}
export { addCode, getAllSessions, updateCodeDoc, getCode, getUser };
