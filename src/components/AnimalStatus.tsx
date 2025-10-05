import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bird, Bug, Search } from "lucide-react";

interface AnimalStatusProps {
  location: string;
}

const AnimalStatus = ({ location }: AnimalStatusProps) => {
  // More realistic animal data with populations and trends
  const animalData = [
    { name: "House Sparrows", icon: "🐦", population: "Declining (-70%)", status: "hazardous", threat: "NO₂ and PM2.5 causing severe respiratory issues", count: "~12,000" },
    { name: "Pigeons", icon: "🕊️", population: "Stable", status: "good", threat: "Highly adaptable to urban environments", count: "~45,000" },
    { name: "Indian Crows", icon: "🐦‍⬛", population: "Increasing (+12%)", status: "good", threat: "Thriving in polluted cities", count: "~38,000" },
    { name: "Honeybees", icon: "🐝", population: "Critical (-85%)", status: "hazardous", threat: "Colony collapse due to ozone and pesticides", count: "~8,500" },
    { name: "Butterflies", icon: "🦋", population: "Declining (-60%)", status: "concern", threat: "Ultra-sensitive to air quality changes", count: "~15,200" },
    { name: "Fruit Bats", icon: "🦇", population: "Moderate", status: "moderate", threat: "Light and air pollution affecting navigation", count: "~22,000" },
    { name: "Parakeets", icon: "🦜", population: "Declining (-45%)", status: "concern", threat: "Respiratory stress from particulate matter", count: "~18,700" },
    { name: "Stray Dogs", icon: "🐕", population: "Increasing (+8%)", status: "moderate", threat: "Respiratory and skin issues from pollution", count: "~67,000" },
  ];

  const [query, setQuery] = useState("");
  const filtered = query
    ? animalData.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : animalData;

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
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const input = form.querySelector('input[name="species"]') as HTMLInputElement;
            setQuery(input.value);
          }}
        >
          <Input
            name="species"
            placeholder="Search birds or animals (e.g., Peacock, Eagle)"
            className="bg-input border border-primary/20"
            defaultValue={query}
          />
          <Button type="submit" variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {filtered.map((animal) => (
              <div
                key={animal.name}
                className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 border border-primary/10 hover:shadow-glow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-float">{animal.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{animal.name}</p>
                      <p className="text-xs text-muted-foreground">{animal.population}</p>
                      <p className="text-xs text-primary font-medium">Est. {animal.count} in area</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(animal.status)} animate-pulse`} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
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
