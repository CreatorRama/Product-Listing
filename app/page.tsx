'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Particle = {
  id: string;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
};

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: `particle-${i}`,
      size: Math.random() * 15 + 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to AMRR TechSols</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Manage your inventory with our simple and efficient item management system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
          <Link
            href="/view-items"
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 hover:border-blue-400/50 transition-all duration-300 text-center hover:scale-105 transform"
          >
            <h2 className="text-xl font-semibold text-white mb-2">View Items</h2>
            <p className="text-gray-300">Browse all available items in the inventory</p>
          </Link>
          
          <Link
            href="/add-item"
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 hover:border-blue-400/50 transition-all duration-300 text-center hover:scale-105 transform"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Add Items</h2>
            <p className="text-gray-300">Add new items to the inventory</p>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Internship Assignment Submission</p>
          <p className="mt-1">AMRR TechSols Pvt Ltd</p>
        </div>
      </div>

      {/* Global styles for the animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}