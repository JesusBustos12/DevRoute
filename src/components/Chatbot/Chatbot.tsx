'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const fetchRemainingLimit = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/limit');
      if (res.ok) {
        const data = await res.json();
        setRemainingRequests(data.remaining);
      } else {
        setRemainingRequests(20);
      }
    } catch (e) {
      console.error('Error fetching limit', e);
      setRemainingRequests(20); // Fallback en caso de error
    }
  }, []);

  useEffect(() => {
    let savedSessionId = localStorage.getItem('devroute_chat_session');
    if (!savedSessionId) {
      savedSessionId = crypto.randomUUID();
      localStorage.setItem('devroute_chat_session', savedSessionId);
    }
    setSessionId(savedSessionId);
  }, []);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      sessionId: sessionId,
    },
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: '¡Hola! Soy el Asistente Dev. Estoy aquí para ayudarte con cualquier duda sobre programación, desarrollo web y los cursos de la ruta de aprendizaje. ¿En qué te puedo ayudar hoy?',
      },
    ],
    onFinish: () => {
      fetchRemainingLimit();
    },
    onError: (err) => {
      if (err.message.includes('429')) {
        setRemainingRequests(0);
      }
    }
  });

  useEffect(() => {
    if (isOpen && remainingRequests === null) {
      fetchRemainingLimit();
    }
  }, [isOpen, remainingRequests, fetchRemainingLimit]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating trigger button */}
      <button
        data-chat-trigger
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
        aria-label="Abrir chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <div
            className={`${styles.chatWindow} ${isClosing ? styles.chatWindowClosing : ''}`}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderLeft}>
                <Bot size={20} />
                <h3 className={styles.chatHeaderTitle}>Asistente Dev</h3>
                {remainingRequests !== null && (
                  <span className={`${styles.limitBadge} ${remainingRequests <= 5 ? (remainingRequests === 0 ? styles.limitBadgeEmpty : styles.limitBadgeWarning) : ''}`}>
                    {remainingRequests}/20
                  </span>
                )}
              </div>
              <button onClick={handleClose} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesArea}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`${styles.messageRow} ${
                      msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant
                    }`}
                  >
                    <div
                      className={`${styles.messageBubble} ${
                        msg.role === 'user'
                          ? styles.messageBubbleUser
                          : styles.messageBubbleAssistant
                      }`}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`${styles.messageRow} ${styles.messageRowAssistant}`}
                  >
                    <div className={styles.loadingDots}>
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={remainingRequests === 0 ? "Límite de peticiones alcanzado" : "Escribe tu pregunta..."}
                className={styles.textInput}
                disabled={remainingRequests === 0}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || remainingRequests === 0}
                className={styles.sendButton}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
