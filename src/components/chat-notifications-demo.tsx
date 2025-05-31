// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatInput } from "@/components/ui/chat-input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface ChatItem {
  id: number
  name: string
  description: string
  icon: string
  color: string
  time: string
  sender: "ai" | "user"
}

const ChatNotification = ({ name, description, icon, color, time, sender }: ChatItem) => {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 40,
        duration: 0.3,
      }}
      className={cn(
        "relative min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-3 mb-3",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        // dark styles - no white background, transparent with subtle border
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        // light styles - subtle background
        "bg-white/5 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.05)]",
        // Positioning based on sender
        sender === "ai" ? "mr-8" : "ml-8", // AI messages slightly left, user messages slightly right
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-8 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-sm">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium dark:text-white">
            <span className="text-xs sm:text-sm">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-[10px] text-gray-500">{time}</span>
          </figcaption>
          <p className="text-[11px] font-normal dark:text-white/60 leading-tight">{description}</p>
        </div>
      </div>
    </motion.figure>
  )
}

export default function ChatNotificationsDemo({
  className,
}: {
  className?: string
}) {
  const [messages, setMessages] = useState<ChatItem[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [continuousIndex, setContinuousIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const conversationFlow = [
    // Initial conversation
    {
      name: "Kōva AI",
      description: "Hello! How can I help transform your business today?",
      time: "2m ago",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "I need help automating my customer support workflow.",
      time: "1m ago",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "Perfect! I can build intelligent chatbots for 24/7 support.",
      time: "30s ago",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "That sounds exactly what I need!",
      time: "10s ago",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    // Continuous conversation
    {
      name: "Kōva AI",
      description: "Great! Our AI can reduce response times by 80%.",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "How does it integrate with our existing CRM?",
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "Seamlessly! We support Salesforce, HubSpot, and more.",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "Can it handle complex customer queries?",
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "It learns from your data and escalates when needed.",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "What about multilingual support?",
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "We support 50+ languages with real-time translation.",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "How quickly can we get started?",
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "We can have you up and running in just 24 hours!",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
    {
      name: "You",
      description: "That's impressive! Let's schedule a demo.",
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user" as const,
    },
    {
      name: "Kōva AI",
      description: "Perfect! I'll send you a calendar link right away.",
      time: "now",
      icon: "🤖",
      color: "#1E86FF",
      sender: "ai" as const,
    },
  ]

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }

  // Auto-scroll whenever messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100) // Small delay to ensure DOM is updated

    return () => clearTimeout(timer)
  }, [messages, isLoading])

  // Initial conversation flow
  useEffect(() => {
    if (messageIndex < 4) {
      // Show first 4 messages quickly
      const timer = setTimeout(
        () => {
          setMessages((prev) => [...prev, { ...conversationFlow[messageIndex], id: Date.now() + messageIndex }])
          setMessageIndex((prev) => prev + 1)
        },
        messageIndex === 0 ? 500 : 1500,
      )

      return () => clearTimeout(timer)
    } else if (messageIndex === 4) {
      // Start continuous conversation after initial messages
      const timer = setTimeout(() => {
        setContinuousIndex(4) // Start from message 4
        setMessageIndex(5) // Mark initial phase as complete
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [messageIndex])

  // Continuous conversation loop
  useEffect(() => {
    if (continuousIndex >= 4 && continuousIndex < conversationFlow.length) {
      const timer = setTimeout(
        () => {
          setMessages((prev) => [...prev, { ...conversationFlow[continuousIndex], id: Date.now() + continuousIndex }])
          setContinuousIndex((prev) => prev + 1)
        },
        // Vary timing for more natural conversation
        continuousIndex % 2 === 0 ? 2500 : 2000,
      )

      return () => clearTimeout(timer)
    } else if (continuousIndex >= conversationFlow.length) {
      // Restart the continuous conversation after a pause
      const timer = setTimeout(() => {
        setContinuousIndex(4) // Restart from message 4
      }, 5000) // 5 second pause before restarting

      return () => clearTimeout(timer)
    }
  }, [continuousIndex])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newUserMessage: ChatItem = {
      id: Date.now(),
      name: "You",
      description: input,
      time: "now",
      icon: "👤",
      color: "#00C9A7",
      sender: "user",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)

    // AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you implement AI-powered solutions that scale with your business.",
        "Let me show you how our automation can reduce response times by 80%.",
        "Our AI assistants learn from your data for personalized experiences.",
        "Would you like to schedule a consultation to discuss your needs?",
        "I can integrate with your existing CRM and support tools seamlessly.",
        "Our chatbots handle complex queries and escalate when needed.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      const newAiMessage: ChatItem = {
        id: Date.now() + 1,
        name: "Kōva AI",
        description: randomResponse,
        time: "now",
        icon: "🤖",
        color: "#1E86FF",
        sender: "ai",
      }

      setMessages((prev) => [...prev, newAiMessage])
      setIsLoading(false)
    }, 2000)
  }

  // Show only the last 4 messages to fit the space
  const displayMessages = messages.slice(-4)

  return (
    <div className={cn("relative flex h-[300px] w-full flex-col overflow-hidden isolate", className)}>
      {/* Custom scrollbar hiding */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>

      {/* Messages Area */}
      <div 
        ref={scrollContainerRef} 
        className="flex-1 hide-scrollbar overflow-y-auto p-2"
        onWheel={(e) => {
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          // Allow touch scrolling within the container
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col justify-end min-h-full">
          <AnimatePresence mode="popLayout">
            {displayMessages.map((item) => (
              <ChatNotification {...item} key={item.id} />
            ))}

            {isLoading && (
              <motion.figure
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 40,
                  duration: 0.3,
                }}
                className={cn(
                  "relative min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-3 mb-3 mr-8",
                  "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                  "bg-white/5 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.05)]",
                )}
              >
                <div className="flex flex-row items-center gap-3">
                  <div
                    className="flex size-8 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: "#1E86FF" }}
                  >
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium dark:text-white">
                      <span className="text-xs sm:text-sm">Kōva AI</span>
                      <span className="mx-1">·</span>
                      <span className="text-[10px] text-gray-500">typing...</span>
                    </figcaption>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.figure>
            )}
          </AnimatePresence>

          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-2 border-t border-white/10">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-md border border-white/20 bg-background/50 focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about AI automation..."
            className="min-h-8 resize-none rounded-md bg-transparent border-0 p-2 text-xs shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-1 justify-end">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1 h-6 text-xs px-2"
              disabled={!input.trim() || isLoading}
            >
              Send
              <CornerDownLeft className="size-2.5" />
            </Button>
          </div>
        </form>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background/20"></div>
    </div>
  )
}
