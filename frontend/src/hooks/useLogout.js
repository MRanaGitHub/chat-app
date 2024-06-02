import toast from "react-hot-toast";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../store/user/user.slice.js";


export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json()


      dispatch(setAuthUser(null))

      if (data?.error) {
        toast.error(data.error)
        return
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {loading, logout}
}