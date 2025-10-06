import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { searchWildlife, getWildlifeByLocation, type AnimalData } from "@/services/wildlifeService";

interface AnimalStatusProps {
  location: string;
}

const AnimalStatus = ({ location }: AnimalStatusProps) => {
  const [query, setQuery] = useState("");
  const [animals, setAnimals] = useState<AnimalData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Load animals based on location
  useEffect(() => {
    const locationAnimals = getWildlifeByLocation(location);
    setAnimals(locationAnimals);
    setHasSearched(false);
  }, [location]);

  const handleSearch = async () => {
    if (!query.trim()) {
      const locationAnimals = getWildlifeByLocation(location);
      setAnimals(locationAnimals);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    
    const results = await searchWildlife(query);
    setAnimals(results);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stable":
        return "bg-success text-success-foreground";
      case "Vulnerable":
        return "bg-warning text-warning-foreground";
      case "Endangered":
        return "bg-destructive/70 text-destructive-foreground";
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🦜 Wildlife Status
        </CardTitle>
        <CardDescription>
          Global animal and bird conservation data for {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search any animal or bird worldwide..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-background/50"
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching} size="default">
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
          {hasSearched && animals.length === 0 && (
            <p className="text-sm text-muted-foreground">No animals found. Try a different search term.</p>
          )}
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {animals.map((animal) => (
              <div key={animal.name + animal.scientificName} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 border border-primary/10 hover:border-primary/30">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{animal.icon}</span>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{animal.name}</h4>
                        <p className="text-xs text-muted-foreground italic">{animal.scientificName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Population: {animal.estimatedCount}</p>
                      </div>
                      <Badge className={getStatusColor(animal.status)}>
                        {animal.status}
                      </Badge>
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Habitat:</span> {animal.habitat}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Threats:</span> {animal.threats}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnimalStatus;
