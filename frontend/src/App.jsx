import './App.css'
import Home from './pages/home/Home'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";

function App() {

  return (
  <>
    <div className={'p-4 h-screen flex justify-center items-center'}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </div>
  </>
  )
}

export default App
