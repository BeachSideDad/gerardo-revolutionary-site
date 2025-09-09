varying vec2 vUv;
varying vec3 vPosition;
varying float vDistortion;
varying vec3 vNormal;

uniform float uTime;
uniform float uRPM;
uniform vec2 uMouse;
uniform float uHover;

// Noise function for organic movement
float noise(vec3 p) {
  return sin(p.x * 10.0) * sin(p.y * 10.0) * sin(p.z * 10.0);
}

void main() {
  vUv = uv;
  vNormal = normal;
  vec3 pos = position;
  
  // Calculate RPM influence (0-1 range, inverted so high RPM = more chaos)
  float rpmInfluence = uRPM / 6000.0;
  
  // Organic distortion based on position and time
  float distortionAmount = noise(position + uTime * 0.5) * rpmInfluence;
  
  // Apply vertex displacement
  pos += normal * distortionAmount * 0.5;
  
  // Magnetic field distortion from mouse
  vec2 mouseDistance = uv - uMouse;
  float dist = length(mouseDistance);
  float magneticField = 1.0 / (1.0 + dist * dist * 10.0);
  
  // Apply magnetic distortion
  pos.z += magneticField * uHover * 2.0;
  
  // Wave ripple effect
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.1;
  pos.z += ripple * uHover * rpmInfluence;
  
  // Breathing effect at low RPM
  float breathing = sin(uTime * 0.5) * (1.0 - rpmInfluence) * 0.1;
  pos *= 1.0 + breathing;
  
  // Neural pulse effect
  float pulse = sin(uTime * rpmInfluence * 10.0) * 0.05;
  pos += normal * pulse;
  
  vDistortion = distortionAmount + magneticField;
  vPosition = pos;
  
  // Apply standard transformations
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}