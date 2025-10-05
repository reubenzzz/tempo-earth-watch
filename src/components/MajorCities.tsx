import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface City {
  name: string;
  country: string;
  continent: string;
  aqi: number;
  level: "good" | "moderate" | "unhealthy" | "hazardous";
  lat: number;
  lng: number;
}

const cities: City[] = [
  // Asia
  { name: "Tokyo", country: "Japan", continent: "Asia", aqi: 45, level: "good", lat: 35.6762, lng: 139.6503 },
  { name: "Beijing", country: "China", continent: "Asia", aqi: 165, level: "unhealthy", lat: 39.9042, lng: 116.4074 },
  { name: "Mumbai", country: "India", continent: "Asia", aqi: 178, level: "unhealthy", lat: 19.0760, lng: 72.8777 },
  { name: "Singapore", country: "Singapore", continent: "Asia", aqi: 32, level: "good", lat: 1.3521, lng: 103.8198 },
  { name: "Dubai", country: "UAE", continent: "Asia", aqi: 88, level: "moderate", lat: 25.2048, lng: 55.2708 },
  
  // Europe
  { name: "London", country: "UK", continent: "Europe", aqi: 52, level: "moderate", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", country: "France", continent: "Europe", aqi: 48, level: "good", lat: 48.8566, lng: 2.3522 },
  { name: "Berlin", country: "Germany", continent: "Europe", aqi: 38, level: "good", lat: 52.5200, lng: 13.4050 },
  { name: "Madrid", country: "Spain", continent: "Europe", aqi: 61, level: "moderate", lat: 40.4168, lng: -3.7038 },
  
  // North America
  { name: "New York", country: "USA", continent: "North America", aqi: 42, level: "good", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", country: "USA", continent: "North America", aqi: 95, level: "moderate", lat: 34.0522, lng: -118.2437 },
  { name: "Mexico City", country: "Mexico", continent: "North America", aqi: 112, level: "unhealthy", lat: 19.4326, lng: -99.1332 },
  { name: "Toronto", country: "Canada", continent: "North America", aqi: 28, level: "good", lat: 43.6532, lng: -79.3832 },
  
  // South America
  { name: "São Paulo", country: "Brazil", continent: "South America", aqi: 73, level: "moderate", lat: -23.5505, lng: -46.6333 },
  { name: "Buenos Aires", country: "Argentina", continent: "South America", aqi: 58, level: "moderate", lat: -34.6037, lng: -58.3816 },
  { name: "Lima", country: "Peru", continent: "South America", aqi: 82, level: "moderate", lat: -12.0464, lng: -77.0428 },
  
  // Africa
  { name: "Cairo", country: "Egypt", continent: "Africa", aqi: 168, level: "unhealthy", lat: 30.0444, lng: 31.2357 },
  { name: "Lagos", country: "Nigeria", continent: "Africa", aqi: 145, level: "unhealthy", lat: 6.5244, lng: 3.3792 },
  { name: "Johannesburg", country: "South Africa", continent: "Africa", aqi: 67, level: "moderate", lat: -26.2041, lng: 28.0473 },
  
  // Oceania
  { name: "Sydney", country: "Australia", continent: "Oceania", aqi: 25, level: "good", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", country: "Australia", continent: "Oceania", aqi: 31, level: "good", lat: -37.8136, lng: 144.9631 },
  { name: "Auckland", country: "New Zealand", continent: "Oceania", aqi: 18, level: "good", lat: -36.8485, lng: 174.7633 },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "good": return "bg-success text-success-foreground";
    case "moderate": return "bg-warning text-warning-foreground";
    case "unhealthy": return "bg-destructive text-destructive-foreground";
    case "hazardous": return "bg-destructive/80 text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const MajorCities = ({ onCitySelect }: { onCitySelect?: (city: City) => void }) => {
  const continents = ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle>Major Cities - Air Quality Index</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {continents.map((continent) => (
            <div key={continent} className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">{continent}</h3>
              <div className="space-y-2">
                {cities
                  .filter((city) => city.continent === continent)
                  .map((city) => (
                    <button
                      key={city.name}
                      onClick={() => onCitySelect?.(city)}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-200 hover:shadow-glow border border-transparent hover:border-primary/30"
                    >
                      <div className="text-left">
                        <p className="font-medium">{city.name}</p>
                        <p className="text-xs text-muted-foreground">{city.country}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-bold">{city.aqi}</p>
                          <p className="text-xs text-muted-foreground">AQI</p>
                        </div>
                        <Badge className={getLevelColor(city.level)}>{city.level}</Badge>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MajorCities;
