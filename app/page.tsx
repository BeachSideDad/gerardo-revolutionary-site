'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { revolutionaryInsights } from '@/lib/core-data';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

// Dynamic imports for 3D components
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

const ParticleSystem = dynamic(() => 
  import('@/components/three/NeuralUniverse/ParticleSystemOptimized').then(mod => ({ default: mod.ParticleSystemOptimized })), 
  { ssr: false }
);

// Keep existing components
const TestimonialCarousel = dynamic(() => 
  import('@/components/testimonial-carousel').then(mod => ({ default: mod.TestimonialCarousel })),
  { ssr: false }
);

const SymptomChecker = dynamic(() => 
  import('@/components/symptom-checker').then(mod => ({ default: mod.SymptomChecker })),
  { ssr: false }
);

const AudienceContent = dynamic(() => 
  import('@/components/audience-toggle').then(mod => ({ default: mod.AudienceContent })),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll to opacity for fade effect
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background Scene */}
      {mounted && (
        <div className="fixed inset-0 z-0">
          <Scene>
            <ParticleSystem 
              count={1500}
              spread={15}
              color="#00D9FF"
              size={0.015}
              speed={0.3}
              mouseInfluence={0.5}
            />
          </Scene>
        </div>
      )}
      
      {/* Hero Section with 3D Integration */}
      <motion.section 
        className="relative z-10 min-h-screen flex items-center justify-center"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                {revolutionaryInsights.core.tagline}
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {revolutionaryInsights.core.discovery}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link
                href="/assessment"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative flex items-center text-white">
                  Take the Assessment
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              
              <Link
                href="/discovery"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold border-2 border-cyan-400 rounded-full hover:bg-cyan-400/10 transition-colors"
              >
                <span className="text-cyan-400">Learn the Discovery</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg className="w-6 h-10 text-cyan-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 40">
              <rect x="8" y="8" width="8" height="16" rx="4" strokeWidth="2"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* Revolutionary Quote Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent via-blue-950/50 to-transparent">
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl md:text-4xl font-light italic text-cyan-300">
            &quot;{revolutionaryInsights.core.breakthroughMoment}&quot;
          </div>
          <div className="mt-6 text-lg text-gray-400">
            — Dr. Gerardo, after {revolutionaryInsights.clinicalEvidence.experience}
          </div>
        </motion.div>
      </section>

      {/* Quick Symptom Checker */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Do You Have Sympathetic Lock?
          </motion.h2>
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800/50 rounded-xl" />}>
            <SymptomChecker showInline={true} />
          </Suspense>
        </div>
      </section>

      {/* Audience-Specific Content */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800/50 rounded-xl" />}>
            <AudienceContent
              patient={
                <motion.div 
                  className="max-w-3xl mx-auto"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                    {revolutionaryInsights.dualAudience.patients.title}
                  </h2>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-cyan-500/20">
                    <p className="text-lg text-gray-300 mb-6">
                      {revolutionaryInsights.dualAudience.patients.focus}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {revolutionaryInsights.dualAudience.patients.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/patients"
                      className="block w-full text-center py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                    >
                      {revolutionaryInsights.callToAction.patient}
                    </Link>
                  </div>
                </motion.div>
              }
              practitioner={
                <motion.div 
                  className="max-w-3xl mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">
                    {revolutionaryInsights.dualAudience.practitioners.title}
                  </h2>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/20">
                    <p className="text-lg text-gray-300 mb-6">
                      {revolutionaryInsights.dualAudience.practitioners.focus}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {revolutionaryInsights.dualAudience.practitioners.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/practitioners"
                      className="block w-full text-center py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                    >
                      {revolutionaryInsights.callToAction.practitioner}
                    </Link>
                  </div>
                </motion.div>
              }
            />
          </Suspense>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Lives Transformed
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<div className="h-64 animate-pulse bg-gray-800/50 rounded-xl" />}>
              <TestimonialCarousel autoRotate={true} interval={5000} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Patient Language Recognition */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent via-yellow-950/20 to-transparent">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-400">
            Your Body Already Knows
          </h2>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-yellow-500/20">
            <p className="text-lg text-gray-300 mb-6 text-center">
              {revolutionaryInsights.patientLanguage.validation}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {revolutionaryInsights.patientLanguage.recognition.map((phrase, idx) => (
                <motion.div 
                  key={idx} 
                  className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-300 italic">&quot;{phrase}&quot;</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-400">
              If these words sound familiar, you&apos;re not imagining it. Your nervous system needs a reset.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20">
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            {revolutionaryInsights.callToAction.primary}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {revolutionaryInsights.callToAction.secondary}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="group relative px-10 py-5 overflow-hidden rounded-full font-semibold"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300"></span>
              <span className="relative text-white">Book a Consultation</span>
            </Link>
            <Link
              href="/discovery"
              className="px-10 py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}