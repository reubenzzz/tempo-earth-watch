import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "@/assets/earth-texture.jpg";
import pollutionOverlay from "@/assets/pollution-overlay.png";

interface EarthProps {
  pollutionLevel: number;
  onRegionClick?: (lat: number, lng: number) => void;
}

// Enhanced Space debris with more realistic representation
function SpaceDebris() {
  const debrisRef = useRef<THREE.Group>(null);
  
  const debris = useMemo(() => {
    const items = [];
    // Increased debris count to show real pollution
    for (let i = 0; i < 300; i++) {
      const distance = 2.8 + Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      const verticalAngle = (Math.random() - 0.5) * Math.PI;
      
      items.push({
        x: Math.cos(angle) * Math.cos(verticalAngle) * distance,
        y: Math.sin(verticalAngle) * distance,
        z: Math.sin(angle) * Math.cos(verticalAngle) * distance,
        size: Math.random() * 0.025 + 0.008,
        speed: Math.random() * 0.002 + 0.0003,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        type: Math.random() > 0.7 ? 'satellite' : 'debris',
      });
    }
    return items;
  }, []);

  useFrame(() => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={debrisRef}>
      {debris.map((item, i) => (
        <mesh 
          key={i} 
          position={[item.x, item.y, item.z]}
          rotation={[
            Math.sin(Date.now() * 0.001 + i) * item.rotationSpeed,
            Math.cos(Date.now() * 0.001 + i) * item.rotationSpeed,
            0
          ]}
        >
          {item.type === 'satellite' ? (
            <>
              <boxGeometry args={[item.size * 1.5, item.size * 0.5, item.size * 1.5]} />
              <meshStandardMaterial 
                color="#FFD700" 
                metalness={0.9} 
                roughness={0.1}
                emissive="#FF6600"
                emissiveIntensity={0.3}
              />
            </>
          ) : (
            <>
              <boxGeometry args={[item.size, item.size, item.size]} />
              <meshStandardMaterial 
                color="#CCCCCC" 
                metalness={0.8} 
                roughness={0.3}
                emissive="#666666"
                emissiveIntensity={0.1}
              />
            </>
          )}
        </mesh>
      ))}
    </group>
  );
}

function Earth({ pollutionLevel, onRegionClick }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pollutionRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer } = useThree();

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
      meshRef.current.rotation.y += 0.001;
    }
    if (pollutionRef.current) {
      pollutionRef.current.rotation.y += 0.001;
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (meshRef.current) {
      const intersect = event.intersections[0];
      if (intersect) {
        const point = intersect.point;
        // Convert 3D point to lat/lng
        const lat = Math.asin(point.y / 2) * (180 / Math.PI);
        const lng = Math.atan2(point.x, point.z) * (180 / Math.PI);
        onRegionClick?.(lat, lng);
      }
    }
  };

  const pollutionOpacity = pollutionLevel / 100 * 0.7;

  return (
    <>
      {/* Realistic Earth sphere - Clickable */}
      <Sphere ref={meshRef} args={[2, 128, 128]} onClick={handleClick}>
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

const EarthVisualization = ({ 
  pollutionLevel = 30,
  onRegionClick 
}: { 
  pollutionLevel?: number;
  onRegionClick?: (lat: number, lng: number) => void;
}) => {
  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gradient-space shadow-earth">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Earth pollutionLevel={pollutionLevel} onRegionClick={onRegionClick} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      {/* Overlay info */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md rounded-lg p-4 border border-primary/30 shadow-glow">
        <p className="text-sm text-muted-foreground mb-2">Global Pollution Level</p>
        <div className="flex items-center gap-3">
          <div className="w-24 h-3 bg-muted rounded-full overflow-hidden border border-primary/20">
            <div
              className="h-full bg-gradient-pollution transition-all duration-500 animate-pollution-wave"
              style={{ width: `${pollutionLevel}%`, backgroundSize: '200% 100%' }}
            />
          </div>
          <span className="text-xl font-bold text-primary">{pollutionLevel}%</span>
        </div>
      </div>

      {/* Interactive hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/30 animate-pulse-glow">
        <p className="text-xs text-accent-foreground font-medium">🌍 Click on the globe to explore regions</p>
      </div>

      {/* Satellite debris counter */}
      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-md rounded-lg p-4 border border-warning/30 shadow-glow">
        <p className="text-xs text-muted-foreground mb-1">Space Debris</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warning animate-twinkle" />
          <span className="text-lg font-bold text-warning">300+</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Tracked Objects</p>
      </div>
    </div>
  );
};

export default EarthVisualization;
