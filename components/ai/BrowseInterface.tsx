'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BrowseInterface.module.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  visualization?: any;
  patterns?: any[];
}

interface BrowseInterfaceProps {
  onRPMSuggestion?: (rpm: number) => void;
  currentRPM?: number;
}

export function BrowseInterface({ onRPMSuggestion, currentRPM = 6000 }: BrowseInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate thinking particles
  useEffect(() => {
    if (!isProcessing) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        if (newParticles.length < 20) {
          newParticles.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100
          });
        }
        return newParticles;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/ai/browse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          context: { currentRPM }
        })
      });

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.message,
        timestamp: new Date(),
        visualization: data.visualization,
        patterns: data.patterns
      };

      setMessages(prev => [...prev, aiMessage]);

      // Suggest RPM if provided
      if (data.rpm_suggestion && onRPMSuggestion) {
        setTimeout(() => {
          onRPMSuggestion(data.rpm_suggestion);
        }, 1000);
      }

    } catch (error) {
      console.error('AI request failed:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  // Animation variants
  const containerVariants = {
    collapsed: {
      height: 60,
      width: 300,
      borderRadius: 30,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    expanded: {
      height: 500,
      width: 400,
      borderRadius: 20,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
    >
      {/* Neural scanning effect when processing */}
      {isProcessing && (
        <div className={styles.neuralScan}>
          <div className={styles.scanLine} />
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className={styles.thinkingParticle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: particle.x + '%',
                y: particle.y + '%'
              }}
              transition={{ duration: 2 }}
            />
          ))}
        </div>
      )}

      {/* Messages container */}
      {isExpanded && (
        <div className={styles.messagesContainer}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`${styles.message} ${styles[message.type]}`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {message.type === 'ai' && (
                  <div className={styles.aiAvatar}>
                    <div className={styles.neuralPulse} />
                  </div>
                )}
                
                <div className={styles.messageContent}>
                  <p>{message.content}</p>
                  
                  {/* Visualization preview */}
                  {message.visualization && (
                    <motion.div 
                      className={styles.visualization}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className={styles.vizPreview}>
                        Neural pattern analysis complete
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Pattern badges */}
                  {message.patterns && message.patterns.length > 0 && (
                    <div className={styles.patterns}>
                      {message.patterns.map((pattern, idx) => (
                        <span key={idx} className={styles.patternBadge}>
                          {pattern.category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator */}
          {isProcessing && (
            <motion.div
              className={styles.typingIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span></span>
              <span></span>
              <span></span>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <motion.input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={isExpanded ? "Describe your symptoms..." : "Ask about TMJ..."}
          className={styles.input}
          disabled={isProcessing}
          animate={{
            opacity: isProcessing ? 0.5 : 1
          }}
        />
        
        <motion.button
          type="submit"
          className={styles.submitButton}
          disabled={isProcessing || !inputValue.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isProcessing ? (
            <div className={styles.processingIcon} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0L8.59 1.41L15.17 8H0V10H15.17L8.59 16.59L10 18L18 10L10 0Z" />
            </svg>
          )}
        </motion.button>
      </form>

      {/* Close button when expanded */}
      {isExpanded && (
        <motion.button
          className={styles.closeButton}
          onClick={() => setIsExpanded(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      )}
    </motion.div>
  );
}