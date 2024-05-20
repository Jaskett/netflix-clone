import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAx8R0fu9VrZ8BHEfSIQwO9i6cM-BCN8cg",
  authDomain: "netflix-clone-f8d37.firebaseapp.com",
  projectId: "netflix-clone-f8d37",
  storageBucket: "netflix-clone-f8d37.appspot.com",
  messagingSenderId: "602640753325",
  appId: "1:602640753325:web:35410781417c9b4e81dc24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
         const res = await createUserWithEmailAndPassword(auth, email, password);
         const user = res.user;
         await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
         });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };