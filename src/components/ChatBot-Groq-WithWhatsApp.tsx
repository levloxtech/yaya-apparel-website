import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Loader } from 'lucide-react'

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
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const WHATSAPP_NUMBER = '919698181105'
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const showPopupInterval = setInterval(() => {
      if (!isOpen) {
        setShowChatbotTooltip(true)
        if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
        tooltipTimeoutRef.current = setTimeout(() => {
          setShowChatbotTooltip(false)
        }, 3000)
      }
    }, 5000)

    return () => {
      clearInterval(showPopupInterval)
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
    }
  }, [isOpen])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: inputValue,
            conversationId: 'yaya-apparel-fashion-chat',
          }),
        }
      )

      if (!response.ok) throw new Error('API Error')

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || 'Sorry, I could not understand. Please ask me about fashion and dresses!',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I am having trouble connecting. Please try again in a moment.',
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
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-4 items-end">

        {/* Chatbot Button */}
        <div className="relative">
          {showChatbotTooltip && !isOpen && (
            <div className="absolute bottom-full right-0 mb-3 z-50">
              <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap shadow-xl font-semibold border border-purple-700">
                ✨ Chat with Fashion Expert
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen)
              setShowChatbotTooltip(false)
            }}
            onMouseEnter={() => {
              setShowChatbotTooltip(true)
              if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
            }}
            onMouseLeave={() => setShowChatbotTooltip(false)}
            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center 
             bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 
             hover:scale-110 hover:shadow-2xl transition-all duration-300 relative"
          >
            {!isOpen && (
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-40 animate-pulse"></div>
            )}

            {isOpen ? (
              <X size={24} className="text-white relative z-10" />
            ) : (
              <span className="text-white text-xl relative z-10">💬</span>
            )}
          </button>
        </div>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg viewBox="0 0 32 32" className="w-8 h-8">
            <path d="M16 1C7.7 1 1 7.7 1 16c0 2.6.7 5.1 1.9 7.2L1 31l7.9-1.8A15 15 0 0016 31c8.3 0 15-6.7 15-15S24.3 1 16 1z" fill="#fff" />
            <path d="M16 3.5C8.8 3.5 3 9.3 3 16.5c0 2.4.6 4.6 1.8 6.5L3.5 28.5l5.7-1.8A12.5 12.5 0 0016 28.5c7.2 0 13-5.8 13-12S23.2 3.5 16 3.5z" fill="#25D366" />
          </svg>
        </a>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-40 w-80 md:w-96">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-[500px] border overflow-hidden">

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-4 flex justify-between">
              <h3 className="text-white font-bold text-sm">YAYA Fashion Expert</h3>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl text-sm ${msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && <Loader className="animate-spin" />}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 flex gap-2 border-t">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-full px-4 py-2"
                placeholder="Ask about dresses..."
              />
              <button className="bg-purple-600 text-white p-2 rounded-full">
                <Send size={18} />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  )
}