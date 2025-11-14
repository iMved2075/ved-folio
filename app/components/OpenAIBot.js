"use client"
import { useState } from "react";

export default function OpenAIBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        const userInput = input;
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userInput }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const botMessage = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                sender: "bot",
                text: "Sorry, I'm having trouble connecting. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!open && (

                <button
                    onClick={() => setOpen(true)}
                    className="bg-green-500 text-black rounded-full p-4 shadow-lg hover:scale-105 flex flex-col items-center"
                >
                    🤖
                    <span className="text-xs">Buddy</span>
                </button>

            )}

            {open && (
                <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700 rounded-xl w-80 h-96 flex flex-col shadow-cyan-500/20">
                    <div className="flex justify-between items-center p-3 border-b border-slate-700">
                        <h3 className="text-cyan-400 font-semibold">Ask Buddy 🤖</h3>
                        <button onClick={() => setOpen(false)}>✖</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.length === 0 && (
                            <div className="text-slate-400 text-sm text-center mt-8">
                                👋 Hi! Ask me anything about Ved&apos;s portfolio, skills, or projects!
                                😢 Sorry for the inconvenience as we are currently in the process of purchasing tokens.
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                                    ? "bg-cyan-500/20 self-end text-right ml-auto"
                                    : "bg-slate-800 text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="bg-slate-800 text-left p-2 rounded-lg max-w-[80%]">
                                <span className="animate-pulse">Buddy is typing...</span>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-slate-700 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
                            placeholder="Type a message..."
                            disabled={loading}
                            className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none disabled:opacity-50"
                        />
                        <button
                            onClick={sendMessage}
                            disabled
                            className="bg-cyan-500 text-black px-3 py-2 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
