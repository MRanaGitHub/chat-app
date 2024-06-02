import {extractTime} from "../../utills/extractTime.js";
import {useSelector} from "react-redux";

const Message = ({message, lastIndex, loggedInUser}) => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
  const authUser = useSelector((state) => state.authUser.value)

  const fromMe = message?.senderId === authUser?._id
  const chatClass = fromMe ? 'chat-end' : 'chat-start'
  const profilePhoto = fromMe ? authUser?.avatar : selectedConversation.avatar
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
