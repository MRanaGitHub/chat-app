import {IoSearchSharp} from "react-icons/io5";
import {useState} from "react";
import {useGetConversation} from "../../hooks/useGetConversation.js";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setSelectedConversation} from "../../store/conversation/conversation.slice.js";

const SerchInput = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()

  const {conversations} = useGetConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    if (conversation) {
      dispatch(
        setSelectedConversation(conversation)
      )
      setSearch("")
    } else {
      toast.error("Conversation not found")
    }

  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="h-6 w-6 outline-none"/>
      </button>
    </form>
  )
}

export default SerchInput
