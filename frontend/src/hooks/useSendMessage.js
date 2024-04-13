import {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const {messages, setMessages, selectedConversation} = useConversation()

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
      });
      const data = await response.json()

      if (data?.error) {
        toast.error(data.error)
        return
      }
      setMessages([...messages, data.data.message])

    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {loading, sendMessage}
}
