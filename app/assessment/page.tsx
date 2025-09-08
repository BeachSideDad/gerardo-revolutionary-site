'use client'

import { useState } from 'react'
import { revolutionaryInsights } from '@/lib/core-data'

export default function AssessmentPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const symptoms = revolutionaryInsights.sympatheticLock.symptoms
  const patientPhrases = revolutionaryInsights.patientLanguage.recognition

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

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true)
    }
  }

  const getResultMessage = () => {
    const score = calculateScore()
    if (score >= 70) {
      return {
        level: 'High',
        message: 'Your symptoms strongly suggest sympathetic lock. You\'re not alone - this is more common than you think.',
        color: 'text-red-600'
      }
    } else if (score >= 40) {
      return {
        level: 'Moderate',
        message: 'You\'re showing several signs of nervous system dysregulation. Early intervention can make a significant difference.',
        color: 'text-yellow-600'
      }
    } else {
      return {
        level: 'Low',
        message: 'Your symptoms suggest mild nervous system involvement. Preventive care could help maintain your balance.',
        color: 'text-green-600'
      }
    }
  }

  if (showResults) {
    const result = getResultMessage()
    const score = calculateScore()

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Your Assessment Results
            </h1>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-700">Sympathetic Lock Likelihood</span>
                <span className={`text-2xl font-bold ${result.color}`}>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${
                    score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className={`text-xl font-semibold mb-3 ${result.color}`}>
                {result.level} Likelihood of Sympathetic Lock
              </h2>
              <p className="text-gray-700">{result.message}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Selected Symptoms:
              </h3>
              <ul className="space-y-2">
                {selectedSymptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">What&apos;s Next?</h3>
              <p className="text-gray-700 mb-4">
                Understanding sympathetic lock is the first step to recovery. Dr. Gerardo&apos;s revolutionary approach 
                addresses the root cause - your nervous system stuck in overdrive.
              </p>
              <p className="text-gray-700">
                {revolutionaryInsights.treatment.philosophy}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowResults(false)
                  setSelectedSymptoms([])
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retake Assessment
              </button>
              <a
                href="/contact"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                Get Help Now
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sympathetic Lock Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Recognize the patterns. Understand your symptoms. Find your path to recovery.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Which symptoms do you experience?
          </h2>
          <div className="space-y-3 mb-8">
            {symptoms.map((symptom, index) => (
              <label
                key={index}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 mr-3"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                <span className="text-gray-700">{symptom}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedSymptoms.length === 0}
            className={`w-full py-4 rounded-lg font-semibold transition-all ${
              selectedSymptoms.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedSymptoms.length > 0 
              ? `Get Your Results (${selectedSymptoms.length} symptoms selected)`
              : 'Select at least one symptom to continue'
            }
          </button>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Do these patient phrases sound familiar?
          </h3>
          <ul className="space-y-2">
            {patientPhrases.map((phrase, index) => (
              <li key={index} className="text-gray-700 italic">
                &quot;{phrase}&quot;
              </li>
            ))}
          </ul>
          <p className="mt-4 text-gray-800 font-medium">
            {revolutionaryInsights.patientLanguage.validation}
          </p>
        </div>
      </div>
    </div>
  )
}