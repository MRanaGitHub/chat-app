import {useContext} from "react";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import {extractTime} from "../../utills/extractTime.js";

const Message = ({message, lastIndex}) => {
  const {authUser} = useAuthContext()
  const loggedInUser = JSON.parse(localStorage.getItem('authUser'))
  const {selectedConversation} = useConversation()
  const fromMe = message?.senderId === loggedInUser?._id
  const chatClass = fromMe ? 'chat-end' : 'chat-start'
  const profilePhoto = fromMe ? loggedInUser?.avatar : selectedConversation.avatar
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
  const formattedDate = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avtar">
        <div className="w-10 rounded-full">
          <img src={profilePhoto} alt={'profile pic'}/>
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;
