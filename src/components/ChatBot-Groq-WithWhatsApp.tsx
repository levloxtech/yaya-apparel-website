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
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
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
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 items-end md:bottom-6">

        {/* Chatbot Button */}
        <div className="relative">
          {showChatbotTooltip && !isOpen && (
            <div className="absolute bottom-full right-0 mb-3 z-50">
              <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-xl font-semibold border border-purple-700">
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
                       hover:scale-110 active:scale-95 hover:shadow-2xl transition-all duration-300 relative"
            aria-label="Open chat"
          >
            {!isOpen && (
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-40 animate-pulse" />
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
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
          style={{ backgroundColor: '#25D366' }}
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 32 32" className="w-8 h-8">
            <path d="M16 1C7.7 1 1 7.7 1 16c0 2.6.7 5.1 1.9 7.2L1 31l7.9-1.8A15 15 0 0016 31c8.3 0 15-6.7 15-15S24.3 1 16 1z" fill="#fff"/>
            <path d="M16 3.5C8.8 3.5 3 9.3 3 16.5c0 2.4.6 4.6 1.8 6.5L3.5 28.5l5.7-1.8A12.5 12.5 0 0016 28.5c7.2 0 13-5.8 13-12S23.2 3.5 16 3.5z" fill="#25D366"/>
          </svg>
        </a>
      </div>

      {/* Mobile Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className={`
            fixed z-50 flex flex-col bg-white shadow-2xl border overflow-hidden
            /* Mobile: full screen bottom sheet */
            inset-x-0 bottom-0 rounded-t-2xl
            /* Height: full screen minus top safe area, or use dvh for modern browsers */
            h-[85dvh] max-h-[85dvh]
            /* Tablet/Desktop: floating panel */
            md:inset-auto md:bottom-28 md:right-6 md:w-96 md:h-[520px] md:rounded-2xl md:max-h-none
          `}
          style={{
            /* Fallback for browsers without dvh support */
            maxHeight: 'calc(100vh - env(safe-area-inset-top, 0px) - 60px)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                👗
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">YAYA Fashion Expert</h3>
                <span className="text-purple-200 text-xs">Online · Ready to help</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-1 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">
                    👗
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm max-w-[78%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  👗
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area — uses padding-bottom to avoid keyboard overlap on iOS */}
          <form
            onSubmit={sendMessage}
            className="p-3 flex gap-2 border-t bg-white flex-shrink-0"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50"
              placeholder="Ask about dresses..."
              autoComplete="off"
              enterKeyHint="send"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-2.5 rounded-full flex-shrink-0 disabled:opacity-50 active:scale-95 transition-all"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}