import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";


const Model = () => {
  const { scene } = useGLTF("/Soda-can.gltf");
  const modelRef = useRef();
  const scale = useRef(1);

  // Animation
  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 1.5; // Speed up rotation
    modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; // Add bounce
  });

  // Hover interaction
  const bind = useGesture({
    onHover: ({ hovering }) => {
      scale.current = hovering ? 1.2 : 1;
    },
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale.current * 3} // Increased scale
      position={[0, -0.5, 0]} // Center position
      {...bind()}
    />
  );
};

const App = () => {
  return (
    <div className="hero-container">
      <Canvas 
        className="canvas-container" 
        camera={{ position: [0, 0, 3], fov: 60 }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Model />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div className="content-overlay">
        <div className="content-wrapper">
          <h1 className="main-heading">Revolutionize Your Experience</h1>
          <p className="subtext">Discover the future of interactive 3D</p>
          <div className="button-container">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;