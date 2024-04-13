import Converstion from "./Converstion"
import useConversation from "../../zustand/useConversation.js";
import {useGetConversation} from "../../hooks/useGetConversation.js";
import {getRandomEmoji} from "../../utills/emojis.js";


const Conversations = () => {

  const {loading, conversations} = useGetConversation()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {
        conversations?.map((conversation, index) => {
          return (
            <Converstion
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIndex={index === conversations.length - 1}
            />
          )
        })
      }
      {
        loading ? <div className="loading loading-spinner"></div> : null
      }
    </div>
  )
}

export default Conversations
