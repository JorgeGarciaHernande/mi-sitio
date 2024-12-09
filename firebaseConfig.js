import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAtDbSrpfI6pyL5CtPpvluanY__CVwNfJI",
  authDomain: "mipagina-c1945.firebaseapp.com",
  projectId: "mipagina-c1945",
  storageBucket: "mipagina-c1945.firebasestorage.app",
  messagingSenderId: "524955876233",
  appId: "1:524955876233:web:40f90500d5d497e54a3f58",
  measurementId: "G-TMFRKP40EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);