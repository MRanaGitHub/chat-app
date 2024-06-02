import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../store/conversation/conversation.slice.js";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const selectedConversationState = useSelector((state) => state.conversation.selectedConversation)
  const messagesState = useSelector((state) => state.conversation.messages)
  const [messages, setMessages] = useState(null);


  useEffect(() => {
    setMessages(messagesState)
  }, [messagesState]);

  useEffect(() => {

    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/messages/${selectedConversationState._id}`);
        const data = await response.json()

        if (data?.error) {
          toast.error(data.error)
          return
        }
        dispatch(setMessages(data.data))
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversationState?._id) {
      getMessages().then()
    }
  }, [selectedConversationState?._id, setMessages]);

  return {loading, messages}
}
