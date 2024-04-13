import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const {messages, setMessages, selectedConversation} = useConversation()


  useEffect(() => {

    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/messages/${selectedConversation._id}`);
        const data = await response.json()

        if (data?.error) {
          toast.error(data.error)
          return
        }

        setMessages(data.data)
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) {
      getMessages().then()
    }
  }, [selectedConversation?._id, setMessages]);

  return {loading, messages}
}
