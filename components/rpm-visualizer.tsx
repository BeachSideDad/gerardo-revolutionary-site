'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RPMVisualizerProps {
  startRPM?: number
  endRPM?: number
  duration?: number
  autoPlay?: boolean
  onComplete?: () => void
  soundEnabled?: boolean
}

export function RPMVisualizer({
  startRPM = 6000,
  endRPM = 800,
  duration = 3000,
  autoPlay = false,
  onComplete,
  soundEnabled = false
}: RPMVisualizerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentRPM, setCurrentRPM] = useState(startRPM)
  const [hasStarted, setHasStarted] = useState(false)

  const handleReset = useCallback(() => {
    setIsAnimating(true)
    setHasStarted(true)
    setCurrentRPM(startRPM)

    const startTime = Date.now()
    const animationTimer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const newRPM = Math.round(startRPM - (startRPM - endRPM) * easeOutQuart)
      
      setCurrentRPM(newRPM)

      if (progress >= 1) {
        clearInterval(animationTimer)
        setIsAnimating(false)
        onComplete?.()
      }
    }, 30)

    return () => clearInterval(animationTimer)
  }, [startRPM, endRPM, duration, onComplete])

  useEffect(() => {
    if (autoPlay && !hasStarted) {
      handleReset()
    }
  }, [autoPlay, hasStarted, handleReset])

  const getGaugeRotation = () => {
    const normalizedRPM = (currentRPM - 0) / (7000 - 0)
    return -135 + (normalizedRPM * 270)
  }

  const getStateColor = () => {
    if (currentRPM > 4000) return 'text-red-500'
    if (currentRPM > 2000) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getStateText = () => {
    if (currentRPM > 4000) return 'STRESSED'
    if (currentRPM > 2000) return 'RESETTING'
    return 'CALM'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg">
      <div className="relative w-80 h-80">
        <svg className="w-full h-full" viewBox="0 0 320 320">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeDasharray="659.73 219.91"
            strokeDashoffset="-109.95"
            transform="rotate(135 160 160)"
          />
          
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="20"
            strokeDasharray="659.73 219.91"
            strokeDashoffset="-109.95"
            transform="rotate(135 160 160)"
            opacity="0.3"
          />
          
          <motion.g
            animate={{ rotate: getGaugeRotation() }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "160px 160px" }}
          >
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="40"
              stroke="currentColor"
              strokeWidth="4"
              className={getStateColor()}
            />
            <circle
              cx="160"
              cy="40"
              r="8"
              fill="currentColor"
              className={getStateColor()}
            />
          </motion.g>
          
          <circle cx="160" cy="160" r="10" fill="#374151" />
          
          {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000].map((rpm, index) => {
            const angle = -135 + (index * 270 / 7)
            const radian = (angle * Math.PI) / 180
            const x = 160 + 115 * Math.cos(radian)
            const y = 160 + 115 * Math.sin(radian)
            return (
              <text
                key={rpm}
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-xs font-medium fill-gray-600"
              >
                {rpm >= 1000 ? `${rpm / 1000}k` : rpm}
              </text>
            )
          })}
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={currentRPM}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className={`text-5xl font-bold ${getStateColor()}`}>
              {currentRPM.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">RPM</div>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={getStateText()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl font-bold mt-6 ${getStateColor()}`}
        >
          {getStateText()}
        </motion.div>
      </AnimatePresence>
      
      <p className="text-gray-600 text-center mt-4 max-w-sm">
        Your nervous system stuck at high RPM, like an engine that can&apos;t idle. 
        Watch how the manual reset brings you back to calm.
      </p>
      
      <button
        onClick={handleReset}
        disabled={isAnimating}
        className={`mt-6 px-8 py-3 rounded-full font-semibold transition-all ${
          isAnimating
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
        }`}
      >
        {isAnimating ? 'Resetting System...' : 'Reset Nervous System'}
      </button>
      
      {soundEnabled && (
        <div className="mt-4 text-sm text-gray-500">
          🔊 Sound effects enabled
        </div>
      )}
    </div>
  )
}