import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SerchInput from "./SerchInput"

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SerchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar
