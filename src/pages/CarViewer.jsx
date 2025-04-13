import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carmodel from '../components/Carmodel';

const CarViewer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full h-screen bg-[#1c1c1c] flex flex-col md:flex-row justify-center items-center text-white">
      {/* Info Panel */}
      <div
        className="p-6 md:w-1/3 text-center md:text-left"
        data-aos="fade-up"
      >
        <h1 className="text-2xl font-bold mb-4">3D Car Viewer</h1>
        <p className="text-sm mb-2">
          This demo showcases a 3D model of a luxury sedan (e.g., BMW M6).
        </p>
        <p className="text-sm">
          Currently, it supports a single car model for demonstration purposes.
          The system is designed with future scalability in mind, allowing for
          more car models and features (such as AR view, color customization, and
          interior exploration) to be added seamlessly.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="w-full md:w-2/3 h-[60vh] md:h-full">
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
