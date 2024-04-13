import toast from "react-hot-toast";
import {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";


export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

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

      localStorage.removeItem('authUser')

      setAuthUser(null)

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