import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect, // Add this
  getRedirectResult, // Add this
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVUPEb6QXiHeBrLpYXSnlba_OceOuU9xU",
  authDomain: "finder-recipe.firebaseapp.com",
  projectId: "finder-recipe",
  storageBucket: "finder-recipe.appspot.com",
  messagingSenderId: "414653290015",
  appId: "1:414653290015:web:8b000d41534b259e48e72a",
  measurementId: "G-CS6LY62FV1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { 
  auth, 
  provider, 
  signInWithPopup,
  signInWithRedirect, // Add this
  getRedirectResult, // Add this
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
};