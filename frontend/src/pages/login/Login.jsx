import {AppRoute} from "../../constant/appRoute.js";
import {useState} from "react";
import {useLogin} from "../../hooks/useLogin.js";

const Login = () => {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const {loading, login} = useLogin()

  const handleLogin = () => {
    login(userName, password).then();
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div
        className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                User Name
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10 bg-slate-900'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Password
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter password'
              className='w-full input input-bordered h-10 bg-slate-900'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href={AppRoute.SignUp} className={"text-sm hover:text-blue-600 mt-2 inline-block"}>
            {"Don't"} have a account
          </a>

          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn btn-block btn-sm mt-2 bg-slate-400 hover:bg-slate-500">
              {
                loading ? <span className={'loading loading-spinner'}> </span> : "Login"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
