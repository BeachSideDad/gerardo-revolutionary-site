import { revolutionaryInsights, testimonials } from '@/lib/core-data'

export default function PatientsPage() {
  const { patients } = revolutionaryInsights.dualAudience
  const { sympatheticLock, treatment } = revolutionaryInsights

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {patients.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {patients.focus}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Journey to Recovery Starts Here
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You&apos;re Experiencing</h3>
              <ul className="space-y-3">
                {sympatheticLock.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Can Expect</h3>
              <ul className="space-y-3">
                {patients.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Stories of Hope and Healing
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.condition}</p>
                  <p className="text-sm font-medium text-green-600 mt-1">{testimonial.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Your Sympathetic Lock
          </h2>
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {sympatheticLock.analogy.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {sympatheticLock.analogy.visual}
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500">{sympatheticLock.analogy.beforeRPM}</div>
                  <div className="text-sm text-gray-600 mt-1">Your RPM Now</div>
                </div>
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500">{sympatheticLock.analogy.afterRPM}</div>
                  <div className="text-sm text-gray-600 mt-1">After Reset</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">The Treatment That Works</h3>
              <p className="text-gray-700">{treatment.philosophy}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What Makes This Different</h3>
              <p className="text-gray-700">{treatment.approach}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recovery Timeline</h3>
              <p className="text-gray-700">{treatment.timeline}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            You&apos;re Not Imagining It
          </h3>
          <p className="text-gray-700 mb-4">
            {revolutionaryInsights.patientLanguage.validation}
          </p>
          <p className="text-gray-700">
            If you&apos;ve been saying things like &quot;I need my nervous system reset&quot; or &quot;I feel stuck in fight mode,&quot; 
            you&apos;re already describing exactly what&apos;s happening. Your body knows what it needs - 
            and now there&apos;s a treatment that addresses it.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {revolutionaryInsights.callToAction.primary}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            You don&apos;t have to live with a nervous system stuck in overdrive. 
            Dr. Gerardo&apos;s revolutionary approach has helped thousands find relief.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              Take the Assessment
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              {revolutionaryInsights.callToAction.patient}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}