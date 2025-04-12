import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Carmodel from '../components/Carmodel';

const CarViewer = () => {
  return (
    <div className="w-full h-screen bg-[#1c1c1c] flex justify-center items-center">
      <div className="w-full h-full">
        <Canvas
          gl={{ alpha: false }}
          camera={{ position: [0, 0.8, 4], fov: 35 }}
          style={{ backgroundColor: '#1c1c1c' }}
        >
          {/* Basic lights for model visibility */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={2} />

          <Suspense fallback={null}>
          <Carmodel scale={[0.7, 0.7, 0.7]} position={[0.4, -0.6, 0]} />

            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default CarViewer;
