import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const PulsingRing = ({ color }) => {
  const meshRef = useRef();
  const scaleRef = useRef(1);
  const scaleDirection = useRef(1); // 1 for growing, -1 for shrinking

  // Animate the scale on every frame
  useFrame(() => {
    if (meshRef.current) {
      // Update the scale
      meshRef.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.3, 16, 100]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
};

const RingComponent = ({ ring }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PulsingRing color={ring?.color} />
      <OrbitControls />
    </Canvas>
  );
};

export default RingComponent;
