import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bird, Bug } from "lucide-react";

interface AnimalStatusProps {
  location: string;
}

const AnimalStatus = ({ location }: AnimalStatusProps) => {
  const animalData = [
    { name: "Sparrows", icon: "🐦", population: "Declining", status: "concern", threat: "Air pollution affecting respiratory system" },
    { name: "Pigeons", icon: "🕊️", population: "Stable", status: "good", threat: "Adaptable to urban pollution" },
    { name: "Crows", icon: "🐦‍⬛", population: "Increasing", status: "good", threat: "Highly adaptable species" },
    { name: "Bees", icon: "🐝", population: "Critical", status: "hazardous", threat: "Severe decline due to air pollutants" },
    { name: "Butterflies", icon: "🦋", population: "Declining", status: "concern", threat: "Sensitive to air quality changes" },
    { name: "Bats", icon: "🦇", population: "Moderate", status: "moderate", threat: "Affected by urban light and air pollution" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-success";
      case "moderate": return "bg-warning";
      case "concern": return "bg-destructive/70";
      case "hazardous": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bird className="w-5 h-5 text-primary" />
          Wildlife Status
        </CardTitle>
        <CardDescription>
          Bird and animal health in {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {animalData.map((animal) => (
              <div
                key={animal.name}
                className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors border border-primary/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{animal.icon}</span>
                    <div>
                      <p className="font-semibold">{animal.name}</p>
                      <p className="text-xs text-muted-foreground">{animal.population} Population</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(animal.status)}`} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {animal.threat}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnimalStatus;
