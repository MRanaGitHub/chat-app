import toast from "react-hot-toast";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../store/user/user.slice.js";


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const login = async (userName, password) => {
    setLoading(true);
    try {

      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, password}),
      });
      const data = await response.json()
      dispatch(setAuthUser(data.data.user))

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

  return {loading, login}
}