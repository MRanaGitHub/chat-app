import './App.css'
import Home from './pages/home/Home'
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import {AppRoute} from "./constant/appRoute.js";
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext.jsx";

function App() {
  const {authUser} = useAuthContext()
  return (
    <>
      <div className={'p-4 h-screen flex justify-center items-center'}>
        <Routes>
          <Route path={AppRoute.Home} element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
          <Route path={AppRoute.Login} element={authUser ? <Navigate to={'/'}/> : <Login/>}/>
          <Route path={AppRoute.SignUp} element={authUser ? <Navigate to={'/'}/> : <SignUp/>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
