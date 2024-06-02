import {useState} from "react";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../store/user/user.slice.js";

export const useSignUp = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const signUp = async (users, confirmPwd) => {
    setLoading(true);

    const success = handleInputValidation(users, confirmPwd)

    if (!success) return

    if (success) {
      try {
        const response = await fetch("/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
        const data = await response.json();

        if (data?.error) {
          toast.error(data.error)
          return
        }
        dispatch(setAuthUser(data))


        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return {loading, signUp}
}

const handleInputValidation = (users, confirmPwd) => {
  const {fullName, userName, email, password, gender, city, country} = users;

  if (!fullName || !userName || !email || !password || !confirmPwd || !gender || !city || !country) {
    toast.error('Please fill all fields')
    return false
  }

  if (password !== confirmPwd) {
    toast.error('Password and confirm password does not match')
    return false
  }

  return true

}