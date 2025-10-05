import { useEffect, useState } from "react";

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"earth" | "polluted">("earth");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next === 50) setStage("polluted");
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-space">
      <div className="relative">
        {/* Earth/Polluted Globe */}
        <div className="relative w-64 h-64 mb-8 animate-rotate">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              stage === "earth"
                ? "bg-gradient-earth shadow-earth"
                : "bg-gradient-pollution shadow-[0_0_50px_hsl(0_84%_60%/0.6)]"
            }`}
            style={{
              backgroundSize: "200% 200%",
              animation: stage === "polluted" ? "pollution-wave 3s ease-in-out infinite" : "none",
            }}
          />
          
          {/* Atmospheric glow */}
          <div
            className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-1000 ${
              stage === "earth" ? "bg-primary/20" : "bg-destructive/30"
            }`}
          />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {stage === "earth" ? "Analyzing Earth's Atmosphere..." : "Detecting Pollution Levels..."}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                stage === "earth" ? "bg-gradient-earth" : "bg-gradient-pollution"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                stage === "earth" ? "bg-primary/40" : "bg-destructive/60"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
