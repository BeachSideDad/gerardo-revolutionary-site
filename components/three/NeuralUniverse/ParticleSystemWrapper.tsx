'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ParticleSystemOptimized } from './ParticleSystemOptimized';

function ErrorFallback({ error }: { error: Error }) {
  console.error('ParticleSystem Error:', error);
  return null; // Return null to not break the 3D scene
}

export function ParticleSystemWrapper(props: any) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={null}>
        <ParticleSystemOptimized {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}