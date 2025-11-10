import { useState } from "react"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI assistant. I can help you find the perfect device for your needs. What are you looking for?",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // TODO: Implement AI integration here
    // For now, add a placeholder response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help! AI integration will be implemented soon. In the meantime, you can browse our device catalogue to find what you need.",
        sender: "ai",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          aria-label="Open AI chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col bg-card rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 translate-x-0 scale-100"
            : "opacity-0 translate-y-4 translate-x-4 scale-95 pointer-events-none"
        } ${
          isMinimized ? "w-80 h-14" : "w-96 h-[600px]"
        }`}
      >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border rounded-t-2xl bg-gradient-to-r from-primary/10 to-accent/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-card-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Helping you find the perfect device</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <Minimize2 className="w-4 h-4 text-neutral-600" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-neutral-600" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-neutral-100 text-card-foreground rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about devices..."
                    className="flex-1 px-4 py-2.5 rounded-lg border-0 bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI integration coming soon • Powered by AI
                </p>
              </div>
            </>
          )}
        </div>
    </>
  )
}

