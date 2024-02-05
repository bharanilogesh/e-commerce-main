import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getApp, getApps } from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDMKVuWtIeQrkWMWpT3-OsexFtIWLKMPq4",
  authDomain: "flipkart-clone-70f11.firebaseapp.com",
  projectId: "flipkart-clone-70f11",
  storageBucket: "flipkart-clone-70f11.appspot.com",
  messagingSenderId: "632539453847",
  appId: "1:632539453847:web:a2fb8dce101a389d698cd2",
  measurementId: "G-LMH9YB4ZPK"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const commerceGoogleProvider = new GoogleAuthProvider();
const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
};
const db = getFirestore(app);
const storage = getStorage(app);
export { commerceGoogleProvider, db, app, storage, createUserDocumentFromAuth };
export const auth = getAuth(app);
