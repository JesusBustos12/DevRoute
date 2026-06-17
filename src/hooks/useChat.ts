'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '@/types';

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: '¡Hola! Soy tu asistente de programación. ¿En qué te puedo ayudar hoy con tu ruta de aprendizaje?'
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages]);

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSend,
    messagesEndRef
  };
}
