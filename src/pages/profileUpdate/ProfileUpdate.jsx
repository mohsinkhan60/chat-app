import "./ProfileUpdate.css"
import assets from "../../assets/assets"

export const ProfileUpdate = () => {
  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avater">
            <input type="file" id="avater" accept=".png, .jpg, .jpeg" hidden />
            <img src={assets.avatar_icon} alt="" />
            upload profile image
          </label>
           <input required type="text" placeholder="your name..." />
           <textarea placeholder="write profile bio" required></textarea>
           <button type="submit">Save</button>
        </form>
        <img className="p-pic" src={assets.logo_icon} alt="" />
      </div>
    </div>
  )
}
export default ProfileUpdate