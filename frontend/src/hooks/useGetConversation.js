import {useEffect, useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true)

        const response = await fetch("/api/v1/users");
        const data = await response.json()

        if (data?.error) {
          toast.error(data.error)
          return
        }

        setConversations(data.data)

      } catch (e) {
        toast.error(e.message)
      } finally {
        setLoading(false)
      }
    }
    getConversation().then()
  }, []);

  return {loading, conversations}
}