import GenderCheckBox from "./GenderCheckBox"

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up
					<span className='text-blue-500'> ChatApp</span>
				</h1>    
        <form className="mt-5">
  
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
						/>
          </div>

          <GenderCheckBox />

          <a href="#" className={"text-sm hover:text-blue-600 inline-block"}>
            Already have an account
          </a>
          
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-slate-900 hover:bg-slate-900 text-[#6f89b6]" > Sign up </button>
          </div>
        </form>    
      </div>
    </div>
  )
}

export default SignUp
