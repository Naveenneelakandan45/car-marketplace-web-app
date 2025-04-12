import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Carmodel(props) {
  const gltf = useLoader(GLTFLoader, '/car.glb'); // ✅ Make sure car.glb is inside /public folder

  return (
    <primitive
      object={gltf.scene}
      scale={2.5}          // 🔥 Looks nice and big
      position={[0, -1.2, 0]} // 🔥 Grounded properly
      rotation={[0, Math.PI, 0]} // Optional: rotate if needed
      {...props}
    />
  );
}
