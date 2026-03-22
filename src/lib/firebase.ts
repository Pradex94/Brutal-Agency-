import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsy-KwbdgRUTOTb0XksZdWsLh_gkOuu6w",
  authDomain: "brutal-agency.firebaseapp.com",
  projectId: "brutal-agency",
  storageBucket: "brutal-agency.firebasestorage.app",
  messagingSenderId: "923016840641",
  appId: "1:923016840641:web:9c4e08b1abe35500f49b40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
