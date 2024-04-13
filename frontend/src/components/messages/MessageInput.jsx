import {BsSend} from "react-icons/bs";
import {useState} from "react";
import {useSendMessage} from "../../hooks/useSendMessage.js";

const MessageInput = () => {
  const [message, setMessage] = useState("")

  const {loading, sendMessage} = useSendMessage()

  const handleSendMessage = async () => {
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => {
            e.preventDefault()
            setMessage(e.target.value)
          }}
        />
        <button
          type="button"
          className="absolute inset-y-2 end-0 flex items-center pe-3"
          disabled={loading}
          onClick={handleSendMessage}
        >
          {loading ? <span className={'loading loading-spinner'}> </span> : <BsSend/>}

        </button>
      </div>
    </form>
  );
};

export default MessageInput;
