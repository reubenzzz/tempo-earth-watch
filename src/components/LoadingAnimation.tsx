import { useEffect, useState } from "react";
import { Rocket, Satellite, Globe2 } from "lucide-react";

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"launch" | "orbit" | "scan">("launch");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next === 33) setStage("orbit");
        if (next === 66) setStage("scan");
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getMessage = () => {
    if (stage === "launch") return "Launching NASA TEMPO Satellite...";
    if (stage === "orbit") return "Establishing Orbital Position...";
    return "Scanning Earth's Atmosphere...";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-space overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* NASA Logo Style Globe */}
        <div className="relative w-80 h-80 mb-12 flex items-center justify-center">
          {/* Orbital rings */}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-orbit" 
               style={{ animationDuration: "20s" }} />
          <div className="absolute inset-4 border-2 border-accent/20 rounded-full animate-orbit" 
               style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <div className="absolute inset-8 border border-primary-glow/30 rounded-full animate-orbit" 
               style={{ animationDuration: "25s" }} />
          
          {/* Central Earth */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-earth shadow-earth animate-float">
            {/* Pollution overlay */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-pollution opacity-0 transition-opacity duration-1000"
              style={{ opacity: stage === "scan" ? 0.4 : 0 }}
            />
            
            {/* Atmospheric glow */}
            <div className="absolute -inset-6 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
            
            {/* Scanning beam */}
            {stage === "scan" && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-slide-down" />
              </div>
            )}
          </div>

          {/* Orbiting satellite */}
          <div 
            className="absolute w-12 h-12 animate-orbit"
            style={{ animationDuration: "10s" }}
          >
            <Satellite className="w-full h-full text-warning drop-shadow-[0_0_20px_hsl(30_100%_50%/0.8)]" />
          </div>

          {/* Icons based on stage */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            {stage === "launch" && <Rocket className="w-16 h-16 text-primary animate-bounce" />}
            {stage === "orbit" && <Satellite className="w-16 h-16 text-accent animate-spin" style={{ animationDuration: "3s" }} />}
            {stage === "scan" && <Globe2 className="w-16 h-16 text-success animate-pulse" />}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-nasa bg-clip-text text-transparent">
              Air-o-pulse
            </h1>
            <h2 className="text-xl font-semibold text-foreground animate-pulse">
              {getMessage()}
            </h2>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="space-y-2">
            <div className="relative w-96 h-3 bg-card/50 backdrop-blur-sm rounded-full overflow-hidden border border-primary/30 shadow-glow">
              <div
                className="h-full bg-gradient-nasa transition-all duration-300 shadow-intense relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-mono">{progress}%</span>
              <span className="text-accent font-medium">System Status: {stage.toUpperCase()}</span>
            </div>
          </div>

          {/* Mission details */}
          <div className="bg-card/30 backdrop-blur-md rounded-lg p-4 border border-primary/20 shadow-glow">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tropospheric Emissions: Monitoring of Pollution
            </p>
            <p className="text-xs text-accent-foreground mt-1 font-medium">
              First space-based instrument for hourly air quality monitoring
            </p>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
