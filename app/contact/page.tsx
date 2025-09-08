'use client'

import { revolutionaryInsights } from '@/lib/core-data'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('submitting')
    
    // Log form data for now
    console.log('Form submitted:', formData)
    
    // Simulate submission delay
    setTimeout(() => {
      setSubmitStatus('success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: '',
          message: ''
        })
      }, 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started
          </h1>
          <p className="text-xl text-gray-600">
            {revolutionaryInsights.callToAction.primary}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">Success!</p>
              <p className="text-green-700">Your message has been sent. We&apos;ll contact you within 24-48 hours.</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                I am a...
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select one</option>
                <option value="patient">Patient seeking treatment</option>
                <option value="practitioner">Healthcare practitioner</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your symptoms or interest in the sympathetic lock protocol..."
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                submitStatus === 'submitting' || submitStatus === 'success'
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {submitStatus === 'submitting' ? 'Sending...' : 
               submitStatus === 'success' ? 'Message Sent!' : 
               'Send Message'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Or call us directly at: <span className="font-semibold">1-800-TMJ-HELP</span>
            </p>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            What Happens Next?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">1.</span>
              We&apos;ll review your information and symptoms
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">2.</span>
              A specialist will contact you within 24-48 hours
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">3.</span>
              We&apos;ll schedule your initial consultation
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">4.</span>
              Begin your journey to nervous system reset
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}