import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB1-OwRZnHoI8hxc0TLWO1LKFwVMrtyyxA",
  authDomain: "newtube-a467a.firebaseapp.com",
  projectId: "newtube-a467a",
  storageBucket: "newtube-a467a.appspot.com",
  messagingSenderId: "950434513537",
  appId: "1:950434513537:web:84e17cc1c9b8e1734b0380",
  measurementId: "G-QTX77VZM3F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;