import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Detect WebGL support synchronously
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Fallback for mobile or if WebGL fails — rich CSS animated orb
const OrbFallback = () => (
  <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative flex items-center justify-center">
    {/* Outer glow */}
    <div
      className="absolute inset-0 rounded-full opacity-30"
      style={{
        background: 'radial-gradient(circle, #00D4FF 0%, #7B2FFF 60%, transparent 80%)',
        filter: 'blur(40px)',
        animation: 'pulse 4s ease-in-out infinite',
      }}
    />
    {/* Rotating ring */}
    <div
      className="absolute rounded-full border border-cyan-400/30"
      style={{
        width: '85%',
        height: '85%',
        animation: 'spin 12s linear infinite',
        boxShadow: '0 0 30px rgba(0,212,255,0.3), inset 0 0 30px rgba(0,212,255,0.1)',
      }}
    />
    {/* Second rotating ring */}
    <div
      className="absolute rounded-full border border-violet-400/20"
      style={{
        width: '70%',
        height: '70%',
        animation: 'spin 8s linear infinite reverse',
        boxShadow: '0 0 20px rgba(123,47,255,0.3)',
      }}
    />
    {/* Main orb body */}
    <div
      className="w-[60%] h-[60%] rounded-full relative"
      style={{
        background: 'radial-gradient(circle at 35% 35%, rgba(0,212,255,0.9) 0%, rgba(0,102,255,0.7) 40%, rgba(123,47,255,0.8) 70%, rgba(6,8,16,0.9) 100%)',
        boxShadow: '0 0 60px rgba(0,212,255,0.5), 0 0 120px rgba(123,47,255,0.3), inset 0 0 40px rgba(0,212,255,0.2)',
        animation: 'orbFloat 6s ease-in-out infinite',
      }}
    >
      {/* Specular highlight */}
      <div
        className="absolute rounded-full"
        style={{
          top: '15%',
          left: '20%',
          width: '30%',
          height: '20%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.6), transparent)',
          filter: 'blur(4px)',
        }}
      />
    </div>
    {/* Particles */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-cyan-400"
        style={{
          top: `${50 + 42 * Math.sin((i / 8) * Math.PI * 2)}%`,
          left: `${50 + 42 * Math.cos((i / 8) * Math.PI * 2)}%`,
          opacity: 0.6 + 0.4 * Math.sin(i),
          animation: `orbParticle ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
          boxShadow: '0 0 8px #00D4FF',
        }}
      />
    ))}
  </div>
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function Core() {
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshBasicMaterial color="#00D4FF" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

function InnerEnergy() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#7B2FFF" 
        emissive="#0066FF" 
        emissiveIntensity={2} 
        transparent 
        opacity={0.8} 
      />
    </mesh>
  );
}

function GlassOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Subtle mouse interaction
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 64, 64]} />
          {/* @ts-ignore - Drei types might be slightly off */}
          <MeshTransmissionMaterial 
            background={new THREE.Color('#060810')}
            transmission={0.9} 
            thickness={0.5} 
            roughness={0.1} 
            ior={0.1}
            chromaticAberration={0.06} 
            anisotropy={0.1} 
            distortion={0.1} 
            distortionScale={0.3} 
            temporalDistortion={0.1} 
            clearcoat={1} 
            attenuationDistance={0.5} 
            attenuationColor="#ffffff" 
            color="#ffffff" 
          />
        </mesh>
        <Core />
        <InnerEnergy />
        <Sparkles count={100} scale={5} size={2} speed={0.4} opacity={0.5} color="#00D4FF" />
      </Float>
    </group>
  );
}

export default function AIOrb() {
  const [canRender, setCanRender] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const hasWebGL = isWebGLAvailable();
    setCanRender(!isMobile && hasWebGL);
  }, []);

  if (!mounted) return <OrbFallback />;

  if (!canRender) {
    return <OrbFallback />;
  }

  return (
    <div className="w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] cursor-none">
      <ErrorBoundary fallback={<OrbFallback />}>
        <Suspense fallback={<OrbFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            onCreated={({ gl }) => {
              if (!gl) setCanRender(false);
            }}
          >
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#7B2FFF" />
            <GlassOrb />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
