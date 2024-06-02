import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../store/conversation/conversation.slice.js";

export const useSendMessage = () => {
  const dispatch = useDispatch()
  const selectedConversationState = useSelector((state) => state.conversation.selectedConversation)
  const messagesState = useSelector((state) => state.conversation.messages)

  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [allMessages, setAllMessages] = useState()


  useEffect(() => {
    setSelectedConversation(selectedConversationState)
  }, [selectedConversationState]);

  useEffect(() => {
    setAllMessages(messagesState)
  }, [messagesState]);

  const sendMessage = async (message) => {
    setLoading(true);
    debugger
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

      dispatch(setMessages(...allMessages, data.data.message))

    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {loading, sendMessage}
}
