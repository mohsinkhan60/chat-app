import "./Login.css"
import assets from "../../assets/assets"
import { useState } from "react"

export const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign Up" && <input type="text" placeholder="username" className="form-input" required />}
        <input type="email" placeholder="Email address" className="form-input" required />
        <input type="password" placeholder="password" className="form-input" required />
        <button type="submit">{currentState === "Sign Up" ? "Create an Account" : "Login Now"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the term of use privacy & policy</p>
        </div>
        <div className="login-forgot">
          {
            currentState === "Sign Up" ?  <p className="login-toggle">Already have an account ?<span onClick={() => setCurrentState("Login")}> Login here</span></p> :
            <p className="login-toggle">Create an Account ?<span onClick={() => setCurrentState("Sign Up")}> click here</span></p>
          }
         
          
        </div>
      </form>
    </div>
  )
}
export default Login