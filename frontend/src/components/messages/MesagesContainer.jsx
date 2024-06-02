import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedConversation} from "../../store/conversation/conversation.slice.js";

const MesagesContainer = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
  const dispatch = useDispatch()
  const noChatSelected = !selectedConversation;

  useEffect(() => {
    return () => {
      dispatch(setSelectedConversation(null))
    }
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected/>
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation?.fullName}</span>
          </div>

          <Messages/>
          <MessageInput/>
        </>
      )}
    </div>
  );
};

export default MesagesContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 Mayur Rana ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>
  );
};
