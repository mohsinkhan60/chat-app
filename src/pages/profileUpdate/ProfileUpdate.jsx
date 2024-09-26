import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

export const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(AppContext);
  
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Please upload a profile image");
        return;
      }
      const docRef = doc(db, "users", uid);
      let imgURL = prevImage; // Default to previous image

      if (image) {
        imgURL = await upload(image);
      }

      await updateDoc(docRef, {
        avatar: imgURL,
        bio: bio,
        name: name
      });

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      toast.success("Profile updated successfully!");
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        
        if (userData) {
          setName(userData.name || "");
          setBio(userData.bio || "");
          setPrevImage(userData.avatar || "");
        }
      } else {
        navigate("/");
      }
    });
    
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon}
              alt="Profile"
            />
            Upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            type="text"
            placeholder="Your name..."
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          className="p-pic"
          src={image ? URL.createObjectURL(image) : prevImage || assets.logo_icon}
          alt="Preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
