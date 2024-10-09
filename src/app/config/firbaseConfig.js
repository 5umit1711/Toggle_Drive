import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

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

async function initAnalytics() {
  if (await isSupported()) {
    const analytics = getAnalytics(app);
    return analytics;
  }
  console.log("Firebase Analytics is not supported in this environment.");
}

initAnalytics();
