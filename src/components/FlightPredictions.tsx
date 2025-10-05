import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, AlertTriangle } from "lucide-react";

interface FlightPredictionsProps {
  pollutionLevel: number;
  location: string;
}

const FlightPredictions = ({ pollutionLevel, location }: FlightPredictionsProps) => {
  const getFlightStatus = () => {
    if (pollutionLevel < 50) return { status: "Safe", color: "bg-success", icon: "✓" };
    if (pollutionLevel < 100) return { status: "Moderate Risk", color: "bg-warning", icon: "⚠" };
    if (pollutionLevel < 150) return { status: "High Risk", color: "bg-destructive", icon: "⚠" };
    return { status: "Hazardous", color: "bg-destructive", icon: "✕" };
  };

  const flightStatus = getFlightStatus();

  const mockFlights = [
    { id: "AA123", type: "Arrival", time: "14:30", status: pollutionLevel < 100 ? "On Time" : "Delayed" },
    { id: "UA456", type: "Departure", time: "15:45", status: pollutionLevel < 100 ? "On Time" : "Delayed" },
    { id: "DL789", type: "Arrival", time: "16:20", status: pollutionLevel < 100 ? "On Time" : "Delayed" },
    { id: "SW234", type: "Departure", time: "17:00", status: pollutionLevel < 100 ? "On Time" : "Delayed" },
  ];

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          Flight Predictions
        </CardTitle>
        <CardDescription>
          Air traffic status for {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
          <div className={`w-3 h-3 rounded-full ${flightStatus.color}`} />
          <div className="flex-1">
            <p className="font-semibold">Overall Flight Status</p>
            <p className="text-sm text-muted-foreground">{flightStatus.status}</p>
          </div>
          <span className="text-2xl">{flightStatus.icon}</span>
        </div>

        {pollutionLevel >= 100 && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
            <p className="text-sm text-warning-foreground">
              High pollution levels may affect flight schedules. Delays possible.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-semibold">Scheduled Flights</p>
          {mockFlights.map((flight) => (
            <div key={flight.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-medium">{flight.id}</p>
                <p className="text-xs text-muted-foreground">{flight.type} • {flight.time}</p>
              </div>
              <Badge variant={flight.status === "On Time" ? "default" : "destructive"}>
                {flight.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightPredictions;
