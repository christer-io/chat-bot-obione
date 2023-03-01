"use client"
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

function SideBarMobile() {
    const { data: session} = useSession();

    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc")
    ))
        
  return (
    <div className="flex flex-col p-2 md:hidden">
        <div className="flex">
            <div>
                {/* New Chat */}
                <NewChat />
                
                <div className="hidden sm:inline">
                {/* Model selection*/}
                <ModelSelection />
                </div>
                
            <div className="flex flex-col space-y-2 my-2">              
                    {loading && (
                    <div className="animate-puls text-center text-white">
                            <p>Loading chats...</p>
                    </div> 
                    )}
                    {/* Mapp through the chat rows*/}
                    {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
            </div>
        </div>
        {session && (
            <div>
                <div className="text-white pl-3 pb-5 text-center" >
                    <img className=" h-12 w-12 rounded-full mx-auto mb-2 " src={session.user?.image!} alt="Profile image"/>
                    <p className="text-white text-center"> {session.user?.name!}</p>
                    <p className="cursor-pointer hover:opacity-50" onClick={() => signOut()}>Log out</p>
                </div>
               
                
            </div>
        )}
    </div>
  );
}

export default SideBarMobile