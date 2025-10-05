import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AirQualityData {
  pollutant: string;
  value: number;
  unit: string;
  level: "good" | "moderate" | "unhealthy" | "hazardous";
  icon: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "good":
      return "bg-success text-success-foreground";
    case "moderate":
      return "bg-warning text-warning-foreground";
    case "unhealthy":
      return "bg-destructive text-destructive-foreground";
    case "hazardous":
      return "bg-destructive/80 text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AirQualityCard = ({ data }: { data: AirQualityData }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">{data.icon}</span>
            {data.pollutant}
          </CardTitle>
          <Badge className={getLevelColor(data.level)}>{data.level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{data.value}</span>
            <span className="text-sm text-muted-foreground">{data.unit}</span>
          </div>
          
          {/* Visual indicator bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                data.level === "good"
                  ? "bg-success"
                  : data.level === "moderate"
                  ? "bg-warning"
                  : "bg-destructive"
              }`}
              style={{ width: `${Math.min((data.value / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
