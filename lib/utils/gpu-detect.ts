export interface GPUTier {
  tier: 'high' | 'medium' | 'low';
  fps: number;
  isMobile: boolean;
}

export function detectGPUTier(): GPUTier {
  // Check if we're on the server
  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof navigator === 'undefined') {
    return { tier: 'medium', fps: 45, isMobile: false };
  }
  
  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Get WebGL renderer info
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    return { tier: 'low', fps: 30, isMobile };
  }
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
    : 'Unknown';
  
  // Detect GPU tier based on renderer string
  const highEndGPUs = /RTX|GTX 10[678]0|GTX 16|GTX 20|GTX 30|GTX 40|RX 6[789]00|RX 7[89]00|M1|M2|M3/i;
  const midEndGPUs = /GTX 9|GTX 10[56]0|RX 5[567]00|Intel Iris|UHD Graphics 6[23]0/i;
  
  let tier: 'high' | 'medium' | 'low';
  let targetFps: number;
  
  if (highEndGPUs.test(renderer) && !isMobile) {
    tier = 'high';
    targetFps = 60;
  } else if (midEndGPUs.test(renderer) || (!isMobile && !highEndGPUs.test(renderer))) {
    tier = 'medium';
    targetFps = 45;
  } else {
    tier = 'low';
    targetFps = 30;
  }
  
  // Override for mobile devices
  if (isMobile) {
    tier = tier === 'high' ? 'medium' : 'low';
    targetFps = Math.min(targetFps, 30);
  }
  
  return { tier, fps: targetFps, isMobile };
}

export function getAdaptiveParticleCount(baseCount: number = 1500): number {
  // SSR safety - return medium tier count on server
  if (typeof window === 'undefined') {
    return Math.floor(baseCount * 0.6);
  }
  
  const gpu = detectGPUTier();
  
  switch (gpu.tier) {
    case 'high':
      return baseCount;
    case 'medium':
      return Math.floor(baseCount * 0.6);
    case 'low':
      return Math.floor(baseCount * 0.3);
    default:
      return Math.floor(baseCount * 0.3);
  }
}