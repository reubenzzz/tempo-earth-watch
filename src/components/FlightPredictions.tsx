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

  // More realistic flight data with airlines
  const mockFlights = [
    { id: "AI148", airline: "Air India", type: "Arrival", time: "14:30", from: "Mumbai", status: pollutionLevel < 100 ? "On Time" : "Delayed 45m" },
    { id: "6E2134", airline: "IndiGo", type: "Departure", time: "15:45", to: "Bangalore", status: pollutionLevel < 100 ? "On Time" : "Delayed 30m" },
    { id: "SG8156", airline: "SpiceJet", type: "Arrival", time: "16:20", from: "Chennai", status: pollutionLevel < 100 ? "On Time" : "Delayed 1h" },
    { id: "UK953", airline: "Vistara", type: "Departure", time: "17:00", to: "Kolkata", status: pollutionLevel < 100 ? "On Time" : "Delayed 25m" },
    { id: "G8321", airline: "GoAir", type: "Arrival", time: "17:45", from: "Hyderabad", status: pollutionLevel < 150 ? "On Time" : "Cancelled" },
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
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Real-Time Flight Status</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">Live</span>
            </div>
          </div>
          {mockFlights.map((flight) => (
            <div key={flight.id} className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 border border-primary/10 hover:border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{flight.id}</p>
                  <p className="text-xs text-muted-foreground">{flight.airline}</p>
                </div>
                <Badge variant={flight.status.includes("On Time") ? "default" : flight.status.includes("Cancelled") ? "destructive" : "secondary"}>
                  {flight.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{flight.type}</span>
                <span>•</span>
                <span>{flight.time}</span>
                <span>•</span>
                <span>{flight.type === "Arrival" ? `From ${(flight as any).from}` : `To ${(flight as any).to}`}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightPredictions;
