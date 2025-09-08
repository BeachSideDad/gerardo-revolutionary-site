'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { revolutionaryInsights } from '@/lib/core-data'

interface SymptomCheckerProps {
  onComplete?: (score: number, selectedSymptoms: string[]) => void
  showInline?: boolean
}

export function SymptomChecker({ onComplete, showInline = false }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const symptoms = revolutionaryInsights.sympatheticLock.symptoms
  const patientPhrases = revolutionaryInsights.patientLanguage.recognition

  const symptomCategories = [
    {
      title: "Physical Symptoms",
      symptoms: symptoms.slice(0, 3)
    },
    {
      title: "Nervous System Signs",
      symptoms: symptoms.slice(3, 6)
    }
  ]

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const calculateScore = () => {
    return Math.round((selectedSymptoms.length / symptoms.length) * 100)
  }

  const getResultInterpretation = (score: number) => {
    if (score >= 70) {
      return {
        level: 'High',
        message: 'Strong indicators of sympathetic lock present',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500'
      }
    } else if (score >= 40) {
      return {
        level: 'Moderate',
        message: 'Several signs of nervous system dysregulation',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500'
      }
    } else {
      return {
        level: 'Low',
        message: 'Minimal sympathetic lock indicators',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500'
      }
    }
  }

  const handleSubmit = () => {
    const score = calculateScore()
    setShowResults(true)
    onComplete?.(score, selectedSymptoms)
  }

  const resetChecker = () => {
    setSelectedSymptoms([])
    setCurrentStep(0)
    setShowResults(false)
  }

  if (showResults) {
    const score = calculateScore()
    const interpretation = getResultInterpretation(score)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${showInline ? '' : 'max-w-2xl mx-auto'} bg-white rounded-xl shadow-lg p-8`}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Your Pattern Recognition Results
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Sympathetic Lock Indicators</span>
            <span className={`text-xl font-bold ${interpretation.color}`}>{score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-3 rounded-full ${
                score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            />
          </div>
        </div>

        <div className={`${interpretation.bgColor} border-l-4 ${interpretation.borderColor} p-4 mb-6`}>
          <p className={`font-semibold ${interpretation.color}`}>
            {interpretation.level} Likelihood
          </p>
          <p className="text-gray-700 mt-1">{interpretation.message}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Your selected patterns:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetChecker}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Check Again
          </button>
          <a
            href="/assessment"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
          >
            Full Assessment
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`${showInline ? '' : 'max-w-2xl mx-auto'} bg-white rounded-xl shadow-lg p-8`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Quick Symptom Pattern Check
      </h3>
      
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-gray-600 mb-6">
              Select all symptoms that apply to you:
            </p>
            <div className="space-y-6">
              {symptomCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h4 className="font-semibold text-gray-900 mb-3">{category.title}</h4>
                  <div className="space-y-2">
                    {category.symptoms.map((symptom, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedSymptoms.includes(symptom)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                        />
                        <span className="text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next: Patient Language Recognition
            </button>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-gray-600 mb-6">
              Do any of these phrases resonate with you?
            </p>
            <div className="space-y-3 mb-6">
              {patientPhrases.slice(0, 3).map((phrase, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-700 italic">&quot;{phrase}&quot;</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {revolutionaryInsights.patientLanguage.validation}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(0)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedSymptoms.length === 0}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  selectedSymptoms.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Get Results
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}