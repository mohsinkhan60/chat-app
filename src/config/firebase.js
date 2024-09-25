import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBzL1hxt1ZzDfAPYkXd0Ss1olc3XREkyOM",
  authDomain: "chat-app-2654b.firebaseapp.com",
  projectId: "chat-app-2654b",
  storageBucket: "chat-app-2654b.appspot.com",
  messagingSenderId: "281796660563",
  appId: "1:281796660563:web:194c7df4d5208620ef25a6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const singup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username,
      email,
      name: "",
      avatar: "",
      bio: "Hay! I'm using chat app.",
      lastSeen:Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}


export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}

export const logout = async() => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
  
}