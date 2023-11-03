import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-pVAvcF70qGtigEjQhFD1GGHa2FZnq1Q",
  authDomain: "kwitter-reloaded-8eeb3.firebaseapp.com",
  projectId: "kwitter-reloaded-8eeb3",
  storageBucket: "kwitter-reloaded-8eeb3.appspot.com",
  messagingSenderId: "771327808469",
  appId: "1:771327808469:web:88df3fb634956c53d0235c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
