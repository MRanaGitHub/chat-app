import toast from "react-hot-toast";
import {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

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
      localStorage.setItem('authUser', JSON.stringify(data.data.user))
      setAuthUser(data.data.user)

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