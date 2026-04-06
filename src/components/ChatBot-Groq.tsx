import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Loader } from 'lucide-react'
import whatsappIcon from '@/assets/whatsapp.png'
import robotIcon from '@/assets/robot.png'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChatbotTooltip, setShowChatbotTooltip] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to YAYA Apparel. I am your fashion consultant. Ask me which dress would be perfect for any occasion!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // WhatsApp number
  const WHATSAPP_NUMBER = '919698181105'
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Call Groq API backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: inputValue,
            conversationId: 'yaya-apparel-fashion-chat',
          }),
        }
      )

      if (!response.ok) {
        throw new Error('API Error')
      }

      const data = await response.json()

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || 'Sorry, I could not understand. Please ask me about fashion and dresses!',
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      // Fallback response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I am having trouble connecting. Please try again in a moment. Ask me: Which dress would be perfect for a wedding?',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        
        {/* Chatbot Button with Popup */}
        <div 
          className="relative"
          onMouseEnter={() => setShowChatbotTooltip(true)}
          onMouseLeave={() => setShowChatbotTooltip(false)}
        >
          {/* Popup Tooltip */}
          {showChatbotTooltip && !isOpen && (
            <div className="absolute bottom-full right-0 mb-3 z-50">
              <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg flex items-center gap-2">
                <span>Chat with me</span>
                {/* Arrow pointing down */}
                <svg 
                  className="absolute top-full right-4 w-3 h-2 text-gray-900"
                  viewBox="0 0 12 8"
                  fill="currentColor"
                >
                  <path d="M0 0 L6 8 L12 0 Z" />
                </svg>
              </div>
            </div>
          )}

          {/* Chatbot Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden ${
              isOpen
                ? 'bg-red-500 hover:bg-red-600 scale-110'
                : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:scale-110 animate-bounce'
            }`}
            title="Chat with YAYA Fashion Expert"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <img 
                src={robotIcon} 
                alt="Chat" 
                className="w-8 h-8 object-contain"
              />
            )}

            {/* Pulse animation */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 animate-pulse" />
            )}
          </button>
        </div>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center bg-green-500 hover:bg-green-600 hover:scale-110 group overflow-hidden"
          title="Chat on WhatsApp - 9698181105"
        >
          {/* WhatsApp Icon Image */}
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="w-8 h-8 object-contain"
          />

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse pointer-events-none" />

          {/* Hover label */}
          <span className="absolute bottom-full right-0 mb-3 bg-gray-800 text-white text-xs px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            WhatsApp
          </span>
        </a>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-sm md:max-w-md lg:max-w-lg animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-[500px] border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={robotIcon} 
                    alt="Chat" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">YAYA Fashion Expert</h3>
                  <p className="text-xs text-orange-100">Get dress recommendations instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-orange-600 p-2 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader size={18} className="animate-spin text-gray-600" />
                    <span className="text-xs text-gray-600">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Which dress would be perfect...?"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-full p-2 transition flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                💡 Try: "Which dress for a wedding?" or "What's perfect for casual wear?"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}