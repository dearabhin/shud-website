import React, { useEffect, useRef /* or useLayoutEffect */ } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// TODO: replace with your real logo asset
const chiefTechLogo =
  'https://via.placeholder.com/150x50?text=Chief+Tech+Logo';

const SHUDWebsite: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null); // 👈 explicit | null

  /* useLayoutEffect runs a little earlier; uncomment if you notice a blank frame */
  useEffect(() => {
    // ----- guard: bail out until the canvas exists -----
    if (!threeCanvasRef.current) return;

    /* ---------- THREE‑JS SETUP ---------- */
    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvasRef.current, // ✅ HTMLCanvasElement here
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    // demo torus — swap for your own model
    const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4299e1,
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    scene.add(new THREE.AmbientLight(0x404040));

    // ---------- ANIMATION LOOP ----------
    const animate = () => {
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ---------- RESIZE HANDLER ----------
    const handleResize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ---------- CLEAN‑UP ----------
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []); // threeCanvasRef never changes, so [] is safe

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-4">
          <img src={chiefTechLogo} alt="Chief Tech Logo" className="h-8" />
          <span className="text-lg font-semibold">Chief Tech</span>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                About&nbsp;Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center relative overflow-hidden">
        {/* Three.js Canvas */}
        <div
          ref={sceneRef}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <canvas
            ref={threeCanvasRef}
            className="absolute inset-0"
            aria-label="3D background"
          />
        </div>

        {/* Left Text / CTA */}
        <div className="text-center md:text-left p-6 md:p-12 z-10 space-y-4 md:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            SHUD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            裸眼立体 • 智能融合 • 沉浸视界
            <br />
            Cutting‑edge 3D HUD Technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full
                         hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                         shadow-lg hover:shadow-xl text-lg"
            >
              Explore&nbsp;SHUD
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-12 border-t border-gray-800">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Invitation</h2>
            <p className="text-gray-400">AUTO SHANGHAI 04/23&nbsp;‑&nbsp;05/02</p>
            <p className="text-gray-400">展位号: 4TH&nbsp;‑ 4A11</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">招贤纳士</h2>
            <p className="text-gray-400">加入&nbsp;Chief Tech, 共同创新</p>
            <button className="mt-2 text-blue-400 hover:text-blue-300 text-base">
              Join&nbsp;Us
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SHUDWebsite;
