import { RPMVisualizer } from '@/components/rpm-visualizer'
import { AudienceContent } from '@/components/audience-toggle'
import { revolutionaryInsights } from '@/lib/core-data'

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Revolutionary Discovery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {revolutionaryInsights.core.breakthroughMoment}
          </p>
        </div>

        <div className="mb-16">
          <RPMVisualizer autoPlay={false} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              The Paradigm Shift
            </h2>
            <p className="text-lg text-gray-700">
              {revolutionaryInsights.core.discovery}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-gray-800 font-medium">
                &quot;Every successfully treated patient says &apos;you reset my nervous system&apos; - not &apos;you fixed my jaw&apos;&quot;
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              The Engine Analogy
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                {revolutionaryInsights.sympatheticLock.analogy.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {revolutionaryInsights.sympatheticLock.analogy.description}
              </p>
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-3xl font-bold text-red-500">
                    {revolutionaryInsights.sympatheticLock.analogy.beforeRPM}
                  </div>
                  <div className="text-sm text-gray-600">Before</div>
                </div>
                <div className="text-2xl self-center">→</div>
                <div>
                  <div className="text-3xl font-bold text-green-500">
                    {revolutionaryInsights.sympatheticLock.analogy.afterRPM}
                  </div>
                  <div className="text-sm text-gray-600">After Reset</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AudienceContent
          patient={
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                What This Means For You
              </h2>
              <ul className="space-y-4">
                {revolutionaryInsights.dualAudience.patients.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
          practitioner={
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Clinical Evidence & Protocols
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Experience</h3>
                  <p className="text-gray-700">{revolutionaryInsights.clinicalEvidence.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Patient Count</h3>
                  <p className="text-gray-700">{revolutionaryInsights.clinicalEvidence.patientCount}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">COVID Impact</h3>
                  <p className="text-gray-700">{revolutionaryInsights.clinicalEvidence.covidImpact}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Paradigm Shift</h3>
                  <p className="text-gray-700">{revolutionaryInsights.clinicalEvidence.paradigmShift}</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-900 font-medium">
                  Ready to learn the sympathetic lock protocol? Join our practitioner certification program.
                </p>
              </div>
            </div>
          }
        />

        <div className="text-center">
          <a
            href="/assessment"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            Take the Sympathetic Lock Assessment
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}