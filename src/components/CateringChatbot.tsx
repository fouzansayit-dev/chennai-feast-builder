'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RotateCcw, Sparkles } from 'lucide-react';
import { chatFn, sendEmailFn } from '@/server-actions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  blocked?: boolean;
}

export default function CateringChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    role: 'assistant',
    content: "Vanakkam! 🙏 Welcome to My Chennai Catering. I'm your AI event assistant. I can help you explore our South Indian menus, traditional leaf meals, services, and check booking availability. How can I help you plan your event today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcc_chat_history');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        setMessages([initialMessage]);
      }
    } catch (e) {
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('mcc_chat_history', JSON.stringify(messages));
      } catch (e) {
        console.error('Failed to save chat history:', e);
      }
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const formattedHistory = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      }));

      // Call TanStack Start server function directly
      const data = await chatFn({ data: { message: textToSend, history: formattedHistory } });

      if (data.success) {
        const assistantMsg: Message = {
          role: 'assistant',
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          blocked: data.blocked
        };
        setMessages(prev => [...prev, assistantMsg]);

        if (data.inquiryDetails) {
          setIsLoading(true);
          try {
            // 1. Post chatbot lead/enquiry directly into CRM database
            const details = data.inquiryDetails;
            try {
              const { enquiriesAPI } = await import('@/services/crmApi');
              await enquiriesAPI.create({
                name: details.name,
                phone: details.phone,
                event_type: details.location || "Chatbot Enquiry",
                event_date: details.eventDate,
                venue: "Chatbot Lead Capture",
                guests: Number(details.guestCount) || 0,
                special_requests: "Submitted via AI Chatbot Assistant"
              });
            } catch (crmErr) {
              console.warn("CRM Chatbot Lead entry failed (non-blocking):", crmErr);
            }

            // 2. Fallback notification email
            const emailData = await sendEmailFn({ data: details });
            
            const finalMsg: Message = {
              role: 'assistant',
              content: "✅ Thank you! Your enquiry has been received successfully. Our team will contact you shortly.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, finalMsg]);
          } catch (e) {
            console.error('Email send error:', e);
            const finalMsg: Message = {
              role: 'assistant',
              content: "Sorry, something went wrong while submitting your enquiry. Please try again or contact us directly.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, finalMsg]);
          }
        }
      } else {
        throw new Error('Failed to fetch response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        role: 'assistant',
        content: "Sorry, I am having trouble connecting right now. Please feel free to contact our catering desk directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let query = '';
    if (action === 'Wedding Catering') {
      query = 'Tell me about your Wedding Catering packages and options.';
    } else if (action === 'Corporate Catering') {
      query = 'What options do you offer for Corporate Event Catering?';
    } else if (action === 'Birthday Catering') {
      query = 'Tell me about your Birthday & Private Party Catering services.';
    }

    if (query) {
      handleSendMessage(query);
    }
  };

  const handleResetChat = () => {
    setMessages([initialMessage]);
    try {
      localStorage.removeItem('mcc_chat_history');
    } catch (e) {}
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[95] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="mb-4 w-[90vw] sm:w-[380px] h-[520px] max-h-[calc(100vh-110px)] sm:max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gold/40 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#3A1029] via-[#4A1535] to-[#2B0C1E] text-white p-4 flex items-center justify-between border-b border-gold/20 shadow-md relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-gold/30">
                  <Sparkles size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white tracking-wide">
                    MCC Event Assistant
                  </h3>
                  <span className="text-[10px] text-gold/90 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    Online • Food Planner
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetChat} title="Reset Conversation" className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <RotateCcw size={15} />
                </button>
                <button onClick={() => setIsOpen(false)} title="Close Assistant" className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-zinc-50/60">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-[#3A1029]">
                        <Sparkles size={11} className="text-[#3A1029]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#3A1029] text-white rounded-tr-none'
                          : msg.blocked
                          ? 'bg-amber-50/70 border border-amber-200 text-amber-900 rounded-tl-none font-medium'
                          : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <span className={`block text-[9px] mt-1 text-right ${isUser ? 'text-white/60' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-[#3A1029] animate-pulse">
                    <Sparkles size={11} />
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#3A1029]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#3A1029]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#3A1029]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-zinc-50 border-t border-zinc-200 px-3 py-2 overflow-x-auto whitespace-nowrap flex gap-2">
              {['Wedding Catering', 'Corporate Catering', 'Birthday Catering'].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(btn)}
                  className="inline-block bg-white hover:bg-gold/10 text-[#3A1029] border border-zinc-300 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-semibold shadow-sm hover:shadow transition-all whitespace-nowrap"
                >
                  {btn}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="p-3 border-t border-zinc-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about menus, weddings, bookings..."
                className="flex-1 border border-zinc-300 rounded-full px-4 py-2.5 text-base md:text-sm focus:outline-none focus:ring-1 focus:ring-[#3A1029] focus:border-[#3A1029] bg-zinc-50 text-zinc-800 placeholder-zinc-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-full bg-[#3A1029] text-white hover:bg-[#2B0C1E] disabled:bg-zinc-200 disabled:text-zinc-400 shadow transition-colors flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#3A1029] to-[#4A1535] text-white shadow-2xl flex items-center justify-center border-2 border-gold/60 relative focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <MessageCircle size={26} />
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}