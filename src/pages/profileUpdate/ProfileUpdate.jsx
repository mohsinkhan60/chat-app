import "./ProfileUpdate.css"
import assets from "../../assets/assets"
import { useState } from "react"

export const ProfileUpdate = () => {
  const  [image, setImage] = useState(false)
  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avater">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="avater" accept=".png, .jpg, .jpeg" hidden />
            <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            upload profile image
          </label>
           <input required type="text" placeholder="your name..." />
           <textarea placeholder="write profile bio" required></textarea>
           <button type="submit">Save</button>
        </form>
        <img className="p-pic" src={image? URL.createObjectURL(image) :assets.logo_icon} alt="" />
      </div>
    </div>
  )
}
export default ProfileUpdate