import { RPMVisualizer } from '@/components/rpm-visualizer'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { SymptomChecker } from '@/components/symptom-checker'
import { AudienceContent } from '@/components/audience-toggle'
import { revolutionaryInsights } from '@/lib/core-data'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with RPMVisualizer */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-green-50 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {revolutionaryInsights.core.tagline}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              {revolutionaryInsights.core.discovery}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <RPMVisualizer autoPlay={false} />
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {revolutionaryInsights.core.mission}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Take the Assessment
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/discovery"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              >
                Learn the Discovery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breakthrough Quote */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-3xl font-light text-gray-800 italic">
            &quot;{revolutionaryInsights.core.breakthroughMoment}&quot;
          </div>
          <div className="mt-4 text-lg text-gray-600">
            — Dr. Gerardo, after {revolutionaryInsights.clinicalEvidence.experience}
          </div>
        </div>
      </section>

      {/* Quick Symptom Checker */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Do You Have Sympathetic Lock?
          </h2>
          <SymptomChecker showInline={true} />
        </div>
      </section>

      {/* Audience-Specific Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AudienceContent
            patient={
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {revolutionaryInsights.dualAudience.patients.title}
                </h2>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    {revolutionaryInsights.dualAudience.patients.focus}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {revolutionaryInsights.dualAudience.patients.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/patients"
                    className="block w-full text-center py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {revolutionaryInsights.callToAction.patient}
                  </Link>
                </div>
              </div>
            }
            practitioner={
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {revolutionaryInsights.dualAudience.practitioners.title}
                </h2>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    {revolutionaryInsights.dualAudience.practitioners.focus}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {revolutionaryInsights.dualAudience.practitioners.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/practitioners"
                    className="block w-full text-center py-3 px-6 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    {revolutionaryInsights.callToAction.practitioner}
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Lives Transformed
          </h2>
          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel autoRotate={true} interval={5000} />
          </div>
        </div>
      </section>

      {/* Patient Language Recognition */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Your Body Already Knows
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6 text-center">
              {revolutionaryInsights.patientLanguage.validation}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {revolutionaryInsights.patientLanguage.recognition.map((phrase, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 italic">&quot;{phrase}&quot;</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-600">
              If these words sound familiar, you&apos;re not imagining it. Your nervous system needs a reset.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {revolutionaryInsights.callToAction.primary}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {revolutionaryInsights.callToAction.secondary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/discovery"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}