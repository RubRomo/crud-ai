import React from "react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import "../styles/Form.css"
import { type Message } from '../types/crud'

import aiChatIcon from '../assets/icons/ai-chat-icon.png';
import userChatIcon from '../assets/icons/user-chat-icon.png';

type Props = { 
    setRefreshFlag: (flag:boolean) => void;
    refreshFlag: boolean;
}

const ChatAI = ({ setRefreshFlag, refreshFlag } : Props) => {

    const [isChatLoading, setChatLoading ] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {role: "assistant", content: "Hello! 👋 I can help you create 🆕, read 📖, update ✏️, and delete 🗑️ products — and even handle multiple tasks 🤹‍♂️ in one conversation. \nTell me what you'd like to do!"},
    ]);
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const chatContainer = containerRef.current;

        const msgElements = chatContainer?.querySelectorAll('div.message-wrapper-right');
        if (msgElements?.length) {
            const last = msgElements[msgElements.length - 1] as HTMLElement;
            // scroll so the top of the last user message
            chatContainer?.scrollTo({
                top: last.offsetTop,
                behavior: "smooth",
            })
            return;
        }
    }, [messages]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const prompt = inputRef.current?.value;

        if (prompt?.trim()) {
            controllerRef.current = new AbortController();

            let newMessages: Message[] = [...messages, {role: "user", content: prompt.trim()}];
            console.log(newMessages);
            setMessages(newMessages)
            // keep last 10 messages
            if (newMessages.length > 10) {
                newMessages = newMessages.slice(-10);
            }
            setChatLoading(true);
            fetch("http://localhost:3000/products/askai", {
                method: "POST",
                body: JSON.stringify({messages : newMessages}),
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controllerRef.current.signal
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then((response) => {
                setMessages((prevState) => [...prevState, {role:"assistant", content: response.data}])
                if(response.hasOwnProperty('refresh') && response.refresh){
                    setRefreshFlag(!refreshFlag)
                }
            })
            .catch((error: any) => {
                if(error.name === "AbortError") return
                if (error.message.includes("429")) {
                    setMessages((prevState) => [...prevState, {role:"assistant", content: "Rate limit exceeded. Please wait a moment and try again."}]);
                    return;
                }
                setMessages((prevState) => [...prevState, {role:"assistant", content: "Sorry there was a problem."}]);
            })
            .finally(() => {
                setChatLoading(false);
                setTimeout(() => {
                    inputRef.current?.focus();
                },500);
            })
        }
        resetPrompt();
    };

    const adjustPromptRows = () => {
        const prompt = inputRef.current;
        const minRows = 1; 
        const lineCount = prompt?.value.split('\n').length || minRows;

        if(prompt){
            prompt.rows = Math.max(minRows, lineCount);
        }
    }

    const resetPrompt = () => {
        const prompt = inputRef.current;
        if(prompt){
            prompt.rows = 1;
            prompt.value = "";
        }
    }

    const handleEnterSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // it calls dynamically the form from the node where event was triggered
            handleSubmit(e as unknown as FormEvent);
        }
    }

    const handleAbort = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }

  return (
    <div className="container my-3 my-md-5">
        <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body">
                <div className="d-flex flex-column" style={{height: "200px", overflowY: "auto"}} ref={containerRef}>
                    {
                        messages.map((msg, index) => (
                            <div className={`d-flex gap-2 ${msg.role === "user" ? "flex-row-reverse align-self-end" : "align-self-start"}`} key={index} >
                                <div className="mt-1 align-self-start flex-shrink-0 bg-info rounded-5" style={{width: "32px", height: "32px"}}>
                                    { msg.role === "user" ? <img className="w-100" src={userChatIcon} /> : <img className="w-100" src={aiChatIcon}/> }
                                </div>
                                <div className={`${msg.role === "user" ? "message-wrapper-right" : "message-wrapper-left"}`}>
                                    <div 
                                        className={`p-2 rounded-3 mb-3 ${msg.role === "user" ? "bg-primary text-white align-self-end" : "bg-light align-self-start"}`}
                                    >
                                        {msg.content.split("\n").map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            )
                        )
                    }
                    {isChatLoading ? <span className="text-muted fade-loop">Loading ...</span> : ""}
                </div>
            </div>
            <div className="card-footer">
                <form onSubmit={handleSubmit} id="aiForm">
                    <div className="d-flex align-items-end gap-2">
                        <textarea 
                            className="form-control shadow-none" 
                            ref={inputRef} disabled={isChatLoading} 
                            style={{resize: "none", overflowY: "hidden"}} 
                            onChange={adjustPromptRows}
                            onKeyDown={handleEnterSubmit}
                            rows={1}
                        >
                        </textarea>
                        {isChatLoading ? (
                            <button type="button" className="input-group-text" onClick={handleAbort}>
                                <MdOutlineCancel size={24} />
                            </button>
                        ) : (
                            <button type="submit" className="input-group-text">
                                <IoIosSend size={24} className="cursor-pointer" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatAI