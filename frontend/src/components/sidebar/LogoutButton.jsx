import {BiLogOut} from "react-icons/bi"
import {useLogout} from "../../hooks/useLogout.js";

const LogoutButton = () => {
  const {loading, logout} = useLogout()

  return (
    <div className="mt-auto">
      {
        !loading ? <BiLogOut onClick={logout} className="h-6 w-6 cursor-pointer text-white"/>
          : <span className={'loading loading-spinner'}> </span>
      }
    </div>
  )
}

export default LogoutButton
