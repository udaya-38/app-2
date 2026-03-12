import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PerspectiveCamera } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ModelViewer({ url }: { url: string }) {
  return (
    <div className="w-full h-full bg-slate-900/50 rounded-xl overflow-hidden border border-white/10">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Stage environment="city" intensity={0.6}>
          <Model url={url} />
        </Stage>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
