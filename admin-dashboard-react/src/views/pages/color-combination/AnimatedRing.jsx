import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const AnimatedRing = ({ color }) => {
  const meshRef = useRef();

  // Rotate the mesh on every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
};

const RingComponent = ({ ring, color }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedRing color={color} />
      <OrbitControls />
    </Canvas>
  );
};

export default RingComponent;
