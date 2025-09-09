/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize build performance
  swcMinify: true,
  
  // Reduce memory usage during build
  experimental: {
    optimizeCss: false, // Disable CSS optimization to reduce build time
    workerThreads: false,
    cpus: 1,
  },
  
  // Increase build timeout
  staticPageGenerationTimeout: 180,
  
  // Optimize for Three.js
  webpack: (config, { isServer }) => {
    // Handle GLSL/shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    
    // Remove Three.js alias - use default export path
    // Three.js v0.160+ handles module resolution correctly
    
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    // Type checking enabled for production safety
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration  
  eslint: {
    // Linting enabled for code quality
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
