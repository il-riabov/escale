import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js';
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-lite.js';


const firebaseConfig = {
  apiKey: "AIzaSyBBfC3M6yZOqRbkf09fGadwT_2qypasM3w",
  authDomain: "escale-calculator.firebaseapp.com",
  projectId: "escale-calculator",
  storageBucket: "escale-calculator.appspot.com",
  messagingSenderId: "473859580078",
  appId: "1:473859580078:web:1760ea65bd69c6e4800d3f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getUsers() {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => {
    let obj = doc.data();
    obj.id = doc.id;
    return obj
  });
  return usersList;
}

export async function setUser(data) {
  await addDoc(collection(db, "users"), data);
}

export async function getUserByID(ID) {
  const userRef = doc(db, "users", `${ID}`);
  const userSnap = await getDoc(userRef);
  return userSnap.data()
}

export async function updateUserByID(ID, data){
  const userRef = doc(db, "users", `${ID}`);
  await updateDoc(userRef, data);
}

export async function deleteUserById(ID) {
  await deleteDoc(doc(db, "users", `${ID}`));
}

export async function getItems() {
  const itemsCol = collection(db, 'items');
  const itemsSnapshot = await getDocs(itemsCol);
  const itemsList = itemsSnapshot.docs.map(doc => {
    let obj = doc.data()
    obj.id = doc.id;
    return obj
  });
  return itemsList;
}

export async function setItem(data) {
  const docRef = await addDoc(collection(db, "items"), data);
  return docRef;
}

export async function deleteItemById(ID) {
  await deleteDoc(doc(db, "items", `${ID}`));
}