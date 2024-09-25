import { Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Chat from "./pages/chat/Chat"
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<ProfileUpdate />} />
    </Routes>
    </>
  )
}
export default App