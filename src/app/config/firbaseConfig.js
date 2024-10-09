import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sumit-s-project-4da32.firebaseapp.com",
  projectId: "sumit-s-project-4da32",
  storageBucket: "sumit-s-project-4da32.appspot.com",
  messagingSenderId: "241936150229",
  appId: "1:241936150229:web:76886d82d58b2cfababc5c",
  measurementId: "G-TDLHLHQNX3"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

