import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface EarthProps {
  pollutionLevel: number; // 0-100
}

function Earth({ pollutionLevel }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create pollution gradient material
  const material = useMemo(() => {
    const cleanColor = new THREE.Color(0x2196F3); // Blue
    const pollutedColor = new THREE.Color(0xFF5252); // Red
    const color = cleanColor.lerp(pollutedColor, pollutionLevel / 100);

    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      roughness: 0.5,
      metalness: 0.3,
    });
  }, [pollutionLevel]);

  // Auto-rotate the earth
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      {/* Earth sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]} material={material}>
        <meshStandardMaterial
          color={material.color}
          emissive={material.emissive}
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color={material.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4FC3F7" />
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
