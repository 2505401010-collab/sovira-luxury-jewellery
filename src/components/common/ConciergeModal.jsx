import React, { useState } from "react";

export default function ConciergeModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "curator",
      text: "Namaskar. I am Devika Rathore from the SOVIRA Salon Concierge. How may the Maison assist your curation this evening?",
      time: "22:42"
    }
  ]);
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "curator",
          text: "Understood with absolute discretion. Your request has been transmitted directly to our Chief Gemological Curator in Jaipur. We are preparing the confidential archive dossier for you.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-surface-container-low border border-primary/20 shadow-2xl flex flex-col h-[520px]">
        {/* Header */}
        <div className="bg-surface-container-lowest p-4 flex items-center justify-between border-b border-primary/15">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/30">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-surface"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary uppercase tracking-wider">
                Discreet Concierge Liaison
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Devika Rathore • 256-Bit Encrypted Channel
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-surface/50">
          <div className="text-center my-1">
            <span className="font-label-sm text-[10px] text-outline uppercase tracking-widest bg-surface-container-high px-2.5 py-1 rounded">
              End-to-End Sovereign Encryption
            </span>
          </div>
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                m.sender === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`p-3 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-on-primary font-medium"
                    : "bg-surface-container border border-primary/15 text-on-surface"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-outline mt-1 font-mono">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-surface-container-lowest border-t border-primary/15 flex items-center gap-2">
          <input
            type="text"
            placeholder="Inquire discreetly on pricing, stone origin or viewings..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-surface-container px-3.5 py-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none border border-outline-variant/40 focus:border-primary"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center hover:bg-primary-fixed transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
