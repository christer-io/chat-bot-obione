import Chat from "../../../components/Chat"
import Chatinput from "../../../components/Chatinput"

type Props = {
    params: {
        id: string;
    };
}

function ChatPage({params: {id}}: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
    {/* chat */}
    <Chat id={id}/>

    {/* chat input */}
    <Chatinput id={id}/>
    </div>
  )
}

export default ChatPage