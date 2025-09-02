
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

type Message = {
  text: string;
  sender: "user" | "system";
};

const FormAI = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {text: "Hello World", sender: "system"}
    ]);
    const [isLoading, setLoading ] = useState(false);

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
            setMessages((prevState) => [...prevState, {text: userInput, sender: "user"}])
            setLoading(true);
            fetch("http://localhost:3000/products/askai", {
                method: "POST",
                body: JSON.stringify({prompt: userInput}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setMessages((prevState) => [...prevState, {text: response.data, sender:"system"}])
            })
            .catch(() => alert("Sorry there was a problem."))
            .finally(() => setLoading(false))
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

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
                                    className={`p-2 rounded mb-3 ${msg.sender === "user" ? "bg-primary text-white align-self-end" : "bg-light align-self-start"}`}
                                >
                                        {msg.text}
                                </span>
                            )
                        )
                    }
                    {isLoading ? <span className="text-muted">Loading ...</span> : ""}
                </div>
            </div>
            <div className="card-footer">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control shadow-none" ref={inputRef} disabled={isLoading}/>
                        <button className="input-group-text">
                            {isLoading ? <MdOutlineCancel size={24} /> : <IoIosSend size={24} className="cursor-pointer" /> }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormAI