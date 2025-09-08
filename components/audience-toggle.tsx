'use client'

import { useEffect, useState, createContext, useContext, ReactNode } from 'react'
import { motion } from 'framer-motion'

type AudienceMode = 'patient' | 'practitioner'

interface AudienceContextValue {
  mode: AudienceMode
  toggleMode: () => void
  isPatientMode: boolean
  isPractitionerMode: boolean
}

const AudienceContext = createContext<AudienceContextValue | undefined>(undefined)

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AudienceMode>('patient')

  useEffect(() => {
    const savedMode = localStorage.getItem('audienceMode') as AudienceMode
    if (savedMode === 'patient' || savedMode === 'practitioner') {
      setMode(savedMode)
    }
  }, [])

  const toggleMode = () => {
    const newMode = mode === 'patient' ? 'practitioner' : 'patient'
    setMode(newMode)
    localStorage.setItem('audienceMode', newMode)
  }

  const value: AudienceContextValue = {
    mode,
    toggleMode,
    isPatientMode: mode === 'patient',
    isPractitionerMode: mode === 'practitioner'
  }

  return (
    <AudienceContext.Provider value={value}>
      {children}
    </AudienceContext.Provider>
  )
}

export function useAudience() {
  const context = useContext(AudienceContext)
  if (!context) {
    throw new Error('useAudience must be used within AudienceProvider')
  }
  return context
}

interface AudienceToggleProps {
  className?: string
  showLabels?: boolean
}

export function AudienceToggle({ className = '', showLabels = true }: AudienceToggleProps) {
  const { mode, toggleMode, isPatientMode, isPractitionerMode } = useAudience()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabels && (
        <span className={`text-sm font-medium transition-colors ${
          isPatientMode ? 'text-blue-600' : 'text-gray-400'
        }`}>
          Patient
        </span>
      )}
      
      <button
        onClick={toggleMode}
        className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        role="switch"
        aria-checked={isPractitionerMode}
        aria-label="Toggle between patient and practitioner mode"
      >
        <span className="sr-only">Toggle audience mode</span>
        <motion.span
          animate={{ x: isPractitionerMode ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-block h-6 w-6 transform rounded-full transition-colors ${
            isPractitionerMode ? 'bg-purple-600' : 'bg-blue-600'
          }`}
        />
      </button>
      
      {showLabels && (
        <span className={`text-sm font-medium transition-colors ${
          isPractitionerMode ? 'text-purple-600' : 'text-gray-400'
        }`}>
          Practitioner
        </span>
      )}
    </div>
  )
}

export function AudienceContent({ 
  patient, 
  practitioner 
}: { 
  patient: ReactNode
  practitioner: ReactNode 
}) {
  const { isPatientMode } = useAudience()
  return <>{isPatientMode ? patient : practitioner}</>
}