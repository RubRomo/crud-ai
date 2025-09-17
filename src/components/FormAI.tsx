import React from "react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

type Message = {
  text: string;
  sender: "user" | "system";
};

const FormAI = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {text: "Hello! how could I support you?", sender: "system"}
    ]);
    const [isLoading, setLoading ] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const chatContainer = containerRef.current;
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const userInput = inputRef.current?.value;

        if (userInput) {
            controllerRef.current = new AbortController();

            setMessages((prevState) => [...prevState, {text: userInput, sender: "user"}])
            setLoading(true);
            fetch("http://localhost:3000/products/askai", {
                method: "POST",
                body: JSON.stringify({prompt: userInput}),
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controllerRef.current.signal
            })
            .then((response) => response.json())
            .then((response) => {
                setMessages((prevState) => [...prevState, {text: response.data, sender:"system"}])
            })
            .catch((error: any) => {
                console.log(error);
                if(error.name !== "AbortError"){
                    alert("Sorry there was a problem.")
                }
            })
            .finally(() => {
                setLoading(false)
            })
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleChange = () => {
        const userInput = inputRef.current;
        const minRows = 1; 
        const lineCount = userInput?.value.split('\n').length || minRows;

        if(userInput?.rows){
            userInput.rows = Math.max(minRows, lineCount);
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const userInput = inputRef.current;
            // it calls dynamically the form from the node where event was triggered
            handleSubmit(e as unknown as FormEvent);
            if(userInput?.rows){
                userInput.rows = 1;
            }
        }
    }

    const handleAbort = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }

  return (
    <div className="container mt-5">
        <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body">
                <div className="d-flex flex-column" style={{height: "200px", overflowY: "auto"}} ref={containerRef}>
                    {
                        messages.map((msg, index) => (
                                <span 
                                    key={index} 
                                    className={`p-2 rounded-3 mb-3 ${msg.sender === "user" ? "bg-primary text-white align-self-end" : "bg-light align-self-start"}`}
                                >
                                    {msg.text.split("\n").map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </span>
                            )
                        )
                    }
                    {isLoading ? <span className="text-muted">Loading ...</span> : ""}
                </div>
            </div>
            <div className="card-footer">
                <form onSubmit={handleSubmit} id="aiForm">
                    <div className="d-flex align-items-end">
                        <textarea 
                            className="form-control shadow-none" 
                            ref={inputRef} disabled={isLoading} 
                            style={{resize: "none", overflowY: "hidden"}} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        >
                        </textarea>
                        {/* <input type="text" className="form-control shadow-none" ref={inputRef} disabled={isLoading}/> */}
                        {isLoading ? (
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

export default FormAI