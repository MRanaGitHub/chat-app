import Message from "./Message";
import {useGetMessages} from "../../hooks/useGetMessages.js";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

const Messages = () => {
  const {loading, messages} = useGetMessages()

  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }, 300)
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <div className="loading loading-spinner"></div>}

      {!loading && messages?.length === 0 ?
        <p className={'text-center text-white'}> Send a message to start the conversation</p>
        :
        messages?.map((message, index) => {
          return (
            <div key={message?._id} ref={lastMessageRef}>
              <Message
                message={message}
                lastIndex={index === messages?.length - 1}
              />
            </div>
          )
        })
      }
    </div>
  );
};

export default Messages;
