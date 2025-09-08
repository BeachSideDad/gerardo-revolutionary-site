'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/core-data'
import { useAudience } from './audience-toggle'

interface TestimonialCarouselProps {
  autoRotate?: boolean
  interval?: number
}

export function TestimonialCarousel({ 
  autoRotate = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isPatientMode } = useAudience()

  const filteredTestimonials = testimonials.filter(t => {
    if (isPatientMode) {
      return true
    }
    return t.outcome === 'Full recovery' || t.outcome === 'Life transformed'
  })

  useEffect(() => {
    if (!autoRotate || filteredTestimonials.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % filteredTestimonials.length
      )
    }, interval)

    return () => clearInterval(timer)
  }, [autoRotate, interval, filteredTestimonials.length])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % filteredTestimonials.length
    )
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  if (filteredTestimonials.length === 0) {
    return null
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-8 overflow-hidden">
      <div className="absolute top-4 left-4">
        <svg className="w-12 h-12 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[200px] flex flex-col justify-center"
          >
            <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 px-8">
              &quot;{filteredTestimonials[currentIndex].text}&quot;
            </blockquote>
            
            <div className="px-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {filteredTestimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {filteredTestimonials[currentIndex].condition}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {filteredTestimonials[currentIndex].outcome}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {filteredTestimonials.length > 1 && (
        <>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}

      {isPatientMode && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Real patients. Real results. Your story could be next.
          </p>
        </div>
      )}
    </div>
  )
}