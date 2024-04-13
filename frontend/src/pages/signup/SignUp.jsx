import GenderCheckBox from "./GenderCheckBox"
import {AppRoute} from "../../constant/appRoute.js";
import {useState} from "react";
import {useSignUp} from "../../hooks/useSignUp.js";

const SignUp = () => {
  const [userInputs, setUserInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    gender: "",
    city: "",
    country: "",
  })
  const [confirmPwd, setConfirmPwd] = useState("")
  const [error, setError] = useState("")
  const {loading, signUp} = useSignUp()

  const handleCheckboxChange = (gender) => {
    setUserInputs({...userInputs, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp(userInputs, confirmPwd)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div
        className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
          <span className='text-blue-500'> ChatApp </span>
        </h1>
        <form className="mt-5" onSubmit={handleSubmit}>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Full Name
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter fullname'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.fullName}
              onChange={(e) => setUserInputs({...userInputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Email
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter youre email'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.email}
              onChange={(e) => setUserInputs({...userInputs, email: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                User Name
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter User Name'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.userName}
              onChange={(e) => setUserInputs({...userInputs, userName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Password
              </span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.password}
              onChange={(e) => setUserInputs({...userInputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Confirm Password
              </span>
            </label>
            <input
              type='password'
              placeholder='Confirm password'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                City
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter city'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.city}
              onChange={(e) => setUserInputs({...userInputs, city: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Country
              </span>
            </label>
            <input
              type='text'
              placeholder='Enter country'
              className='w-full input input-bordered h-10 bg-slate-900 text-[#6f89b6]'
              value={userInputs.country}
              onChange={(e) => setUserInputs({...userInputs, country: e.target.value})}
            />
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={userInputs.gender}/>

          <a href={
            AppRoute.Login} className={"text-sm hover:text-blue-600 inline-block"}>
            Already have an account
          </a>

          <div>
            <button disabled={loading}
                    className="btn btn-block btn-sm mt-2 bg-slate-900 hover:bg-slate-900 text-[#6f89b6]">
              {loading ? <span className={'loading loading-spinner'}> </span> : "Sign up"}

            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
