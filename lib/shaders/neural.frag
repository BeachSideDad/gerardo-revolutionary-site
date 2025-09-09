varying vec2 vUv;
varying vec3 vPosition;
varying float vDistortion;
varying vec3 vNormal;

uniform vec3 uColor;
uniform float uTime;
uniform float uRPM;
uniform float uHover;
uniform vec2 uMouse;

// Creates a gradient based on UV coordinates
vec3 gradient(vec2 uv, vec3 color1, vec3 color2) {
  return mix(color1, color2, uv.y);
}

// Fractal noise for energy field effect
float fractalNoise(vec2 uv) {
  float n = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  
  for(int i = 0; i < 4; i++) {
    n += amplitude * sin(uv.x * frequency + uTime) * sin(uv.y * frequency + uTime);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return n;
}

void main() {
  vec3 color = uColor;
  
  // RPM-based color shift
  float rpmNormalized = uRPM / 6000.0;
  
  // Color transitions from red (stressed) to green (calm)
  vec3 stressColor = vec3(1.0, 0.0, 0.267);  // #FF0044
  vec3 calmColor = vec3(0.0, 1.0, 0.533);    // #00FF88
  vec3 baseColor = mix(calmColor, stressColor, rpmNormalized);
  
  // Add glow based on distortion
  float glow = pow(vDistortion, 2.0) * uHover;
  vec3 glowColor = vec3(0.0, 0.85, 1.0); // Electric blue
  color = mix(baseColor, glowColor, glow);
  
  // Energy field effect
  float energy = fractalNoise(vUv * 10.0);
  vec3 energyColor = vec3(1.0, 0.0, 1.0); // Magenta
  color = mix(color, energyColor, energy * uHover * 0.3 * rpmNormalized);
  
  // Neural pathway highlighting
  float neuralHighlight = sin(vDistortion * 50.0 + uTime * 2.0) * 0.5 + 0.5;
  color += vec3(0.0, 0.5, 1.0) * neuralHighlight * 0.2;
  
  // Fresnel effect for rim lighting
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = 1.0 - dot(viewDirection, normalize(vNormal));
  fresnel = pow(fresnel, 2.0);
  color += glowColor * fresnel * 0.5;
  
  // Pulse effect based on RPM
  float pulse = sin(uTime * rpmNormalized * 5.0) * 0.1 + 0.9;
  color *= pulse;
  
  // Distance-based intensity
  float distanceFromMouse = length(vUv - uMouse);
  float intensity = 1.0 - smoothstep(0.0, 1.0, distanceFromMouse) * 0.3;
  color *= intensity;
  
  // Chromatic aberration at high RPM
  if(rpmNormalized > 0.7) {
    float aberration = rpmNormalized * 0.01;
    color.r = texture2D(tDiffuse, vUv + vec2(aberration, 0.0)).r;
    color.b = texture2D(tDiffuse, vUv - vec2(aberration, 0.0)).b;
  }
  
  // Output with alpha
  float alpha = 1.0;
  
  // Fade edges for smooth blending
  float edgeFade = smoothstep(0.0, 0.1, vUv.x) * 
                   smoothstep(1.0, 0.9, vUv.x) * 
                   smoothstep(0.0, 0.1, vUv.y) * 
                   smoothstep(1.0, 0.9, vUv.y);
  alpha *= edgeFade;
  
  gl_FragColor = vec4(color, alpha);
  
  // Add bloom hint for post-processing
  #ifdef BLOOM_ENABLED
    if(glow > 0.5 || fresnel > 0.7) {
      gl_FragColor.rgb *= 1.5;
    }
  #endif
}