import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC4TsXKeJpLLRSuhJBmDh7nyyOhd_CVgKY",
  authDomain: "use-daily.firebaseapp.com",
  projectId: "use-daily",
  storageBucket: "use-daily.firebasestorage.app",
  messagingSenderId: "69998984814",
  appId: "1:69998984814:web:ada7e63e6d404e8a8a307f",
  measurementId: "G-EE3D2QJB5H",
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
