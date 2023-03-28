import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCJQ5FTd979cSW6XlM12o34QuTCXtfZ2HQ",
  authDomain: "clone-3105d.firebaseapp.com",
  projectId: "clone-3105d",
  storageBucket: "clone-3105d.appspot.com",
  messagingSenderId: "1057766610000",
  appId: "1:1057766610000:web:021d736c7d2ed1e3522d55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;