import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Heart, Activity, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthImpactProps {
  airQualityLevel: "good" | "moderate" | "unhealthy" | "hazardous";
}

const HealthImpact = ({ airQualityLevel }: HealthImpactProps) => {
  const getHealthInfo = () => {
    switch (airQualityLevel) {
      case "good":
        return {
          message: "Air quality is satisfactory. Enjoy outdoor activities!",
          recommendations: [
            "Perfect conditions for all outdoor activities",
            "No health concerns for any population groups",
            "Great time for exercise and recreation",
          ],
          icon: Heart,
          color: "text-success",
          bgColor: "bg-success/10",
        };
      case "moderate":
        return {
          message: "Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.",
          recommendations: [
            "Sensitive groups should reduce prolonged outdoor activities",
            "Monitor symptoms if you have respiratory conditions",
            "Generally safe for most people",
          ],
          icon: Activity,
          color: "text-warning",
          bgColor: "bg-warning/10",
        };
      case "unhealthy":
        return {
          message: "Air quality is unhealthy. Everyone should reduce outdoor activities.",
          recommendations: [
            "Limit outdoor activities, especially for children and elderly",
            "Use N95 masks if going outside",
            "Keep windows closed, use air purifiers indoors",
            "Monitor respiratory symptoms closely",
          ],
          icon: AlertTriangle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
        };
      case "hazardous":
        return {
          message: "Air quality is hazardous. Avoid all outdoor activities.",
          recommendations: [
            "Stay indoors and keep windows closed",
            "Use high-efficiency air purifiers",
            "Wear N95/N99 masks if you must go outside",
            "Seek medical attention if experiencing symptoms",
            "Vulnerable groups should relocate if possible",
          ],
          icon: AlertTriangle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
        };
      default:
        return {
          message: "Analyzing air quality data...",
          recommendations: [],
          icon: Wind,
          color: "text-muted-foreground",
          bgColor: "bg-muted/10",
        };
    }
  };

  const healthInfo = getHealthInfo();
  const Icon = healthInfo.icon;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${healthInfo.color}`} />
          Health Impact & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className={healthInfo.bgColor}>
          <AlertDescription className="font-medium">{healthInfo.message}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Recommendations:</h4>
          <ul className="space-y-2">
            {healthInfo.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
            Find Nearby Medical Facilities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthImpact;
