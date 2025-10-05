import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "@/assets/earth-texture.jpg";
import pollutionOverlay from "@/assets/pollution-overlay.png";

interface EarthProps {
  pollutionLevel: number; // 0-100
}

// Space debris component
function SpaceDebris() {
  const debrisRef = useRef<THREE.Group>(null);
  
  const debris = useMemo(() => {
    const items = [];
    for (let i = 0; i < 100; i++) {
      const distance = 2.8 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      const verticalAngle = (Math.random() - 0.5) * Math.PI;
      
      items.push({
        x: Math.cos(angle) * Math.cos(verticalAngle) * distance,
        y: Math.sin(verticalAngle) * distance,
        z: Math.sin(angle) * Math.cos(verticalAngle) * distance,
        size: Math.random() * 0.02 + 0.01,
        speed: Math.random() * 0.001 + 0.0005,
      });
    }
    return items;
  }, []);

  useFrame(() => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={debrisRef}>
      {debris.map((item, i) => (
        <mesh key={i} position={[item.x, item.y, item.z]}>
          <boxGeometry args={[item.size, item.size, item.size]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Earth({ pollutionLevel }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pollutionRef = useRef<THREE.Mesh>(null);

  // Load textures
  const [earthMap, pollutionMap] = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    return [
      textureLoader.load(earthTexture),
      textureLoader.load(pollutionOverlay),
    ];
  }, []);

  // Auto-rotate the earth
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (pollutionRef.current) {
      pollutionRef.current.rotation.y += 0.002;
    }
  });

  const pollutionOpacity = pollutionLevel / 100 * 0.6;

  return (
    <>
      {/* Realistic Earth sphere */}
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={earthMap}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Pollution heatmap overlay */}
      <Sphere ref={pollutionRef} args={[2.02, 128, 128]}>
        <meshBasicMaterial
          map={pollutionMap}
          transparent
          opacity={pollutionOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color={pollutionLevel > 50 ? "#FF5252" : "#4FC3F7"}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Space debris */}
      <SpaceDebris />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4FC3F7" />
    </>
  );
}

const EarthVisualization = ({ pollutionLevel = 30 }: { pollutionLevel?: number }) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-space shadow-earth">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Earth pollutionLevel={pollutionLevel} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      {/* Overlay info */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
        <p className="text-sm text-muted-foreground">Pollution Level</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-pollution transition-all duration-300"
              style={{ width: `${pollutionLevel}%` }}
            />
          </div>
          <span className="text-lg font-bold">{pollutionLevel}%</span>
        </div>
      </div>
    </div>
  );
};

export default EarthVisualization;
