"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { json } from "stream/consumers";
import useSWR from "swr";
import { db } from "../firebase";
import ModelSelection from "./ModelSelection";
import SideBar from "./SideBar";


type Props = {
    id: string;
};

function Chatinput({id}: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    //get model
    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: "text-davinci-003"
    })

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=jon+doe`,
            }
        }
       
        await addDoc(collection(db, "users", session?.user?.email!, "chats", id, "messages"),
            message)
        
        // tost message - I am loading
        const notification = toast.loading("ChatGPT is working....");

        await fetch("/api/askQuestion", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: input, 
                id, 
                model, 
                session,
            }),
        }).then(() =>{
            //toast notification success
            toast.success("ChatGPT has responded", {
                id: notification,
            })
        });
       

    };
    
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <input className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text" 
            placeholder="Type your text here" 
            />
            
            <button 
                disabled={!prompt} 
                type="submit"
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                <PaperAirplaneIcon className="h-4 w-4 rotate-45"/>
            </button>
        </form>
        
    </div>
  )
}

export default Chatinput