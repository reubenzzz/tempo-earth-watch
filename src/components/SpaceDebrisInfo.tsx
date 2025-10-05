import { Satellite, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SpaceDebrisInfo = () => {
  const debrisStats = [
    { 
      name: "Active Satellites", 
      count: 8800, 
      color: "text-success",
      bgColor: "bg-success/20",
      trend: "+12% this year",
      risk: "Low"
    },
    { 
      name: "Defunct Satellites", 
      count: 3200, 
      color: "text-warning",
      bgColor: "bg-warning/20",
      trend: "+8% this year",
      risk: "Medium"
    },
    { 
      name: "Rocket Bodies", 
      count: 2500, 
      color: "text-destructive",
      bgColor: "bg-destructive/20",
      trend: "+15% this year",
      risk: "High"
    },
    { 
      name: "Debris Fragments", 
      count: 34000, 
      color: "text-destructive",
      bgColor: "bg-destructive/20",
      trend: "+22% this year",
      risk: "Critical"
    },
  ];

  const recentIncidents = [
    {
      date: "2024-09",
      event: "Collision Alert: Starlink-4521 & Cosmos-2251 debris",
      severity: "High",
      action: "Maneuver executed"
    },
    {
      date: "2024-08",
      event: "Chinese rocket stage breakup in LEO",
      severity: "Critical",
      action: "Tracking 847 new fragments"
    },
    {
      date: "2024-07",
      event: "ISS debris avoidance maneuver",
      severity: "Medium",
      action: "Successful avoidance"
    },
  ];

  const totalDebris = debrisStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-warning/30 shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-warning" />
          Space Debris & Satellite Wastage
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time tracking of orbital debris and pollution
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Count */}
        <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
          <p className="text-sm text-muted-foreground mb-1">Total Tracked Objects</p>
          <p className="text-4xl font-bold text-warning">{totalDebris.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Objects larger than 10cm in Low Earth Orbit
          </p>
        </div>

        {/* Debris Categories */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-foreground">Debris Categories</h3>
          {debrisStats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stat.bgColor}`} />
                  <span className="text-sm font-medium">{stat.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${stat.color}`}>
                    {stat.count.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Risk: {stat.risk}
                  </span>
                </div>
              </div>
              <Progress 
                value={(stat.count / totalDebris) * 100} 
                className="h-2"
              />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Incidents */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Recent Orbital Events
          </h3>
          {recentIncidents.map((incident, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-card/80 rounded-lg border border-border/50 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{incident.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  incident.severity === "Critical" ? "bg-destructive/20 text-destructive" :
                  incident.severity === "High" ? "bg-warning/20 text-warning" :
                  "bg-primary/20 text-primary"
                }`}>
                  {incident.severity}
                </span>
              </div>
              <p className="text-sm font-medium">{incident.event}</p>
              <p className="text-xs text-muted-foreground">→ {incident.action}</p>
            </div>
          ))}
        </div>

        {/* Environmental Impact */}
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Environmental Concerns
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Kessler Syndrome risk increasing with debris density</li>
            <li>• Defunct satellites re-entry creates atmospheric pollution</li>
            <li>• Rocket launches contribute to ozone depletion</li>
            <li>• Metal oxides from satellite burnup affect stratosphere</li>
            <li>• Light pollution from mega-constellations affects astronomy</li>
          </ul>
        </div>

        {/* Mitigation Efforts */}
        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
          <h4 className="font-semibold text-sm mb-2 text-success">Active Mitigation</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>✓ ESA ClearSpace-1 debris removal mission (2026)</li>
            <li>✓ NASA orbital debris tracking network expansion</li>
            <li>✓ Post-mission disposal guidelines enforcement</li>
            <li>✓ Active Debris Removal (ADR) technologies in development</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceDebrisInfo;
