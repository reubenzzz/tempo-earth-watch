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
  { name: "New Delhi", country: "India", continent: "Asia", aqi: 182, level: "unhealthy", lat: 28.6139, lng: 77.2090 },
  { name: "Singapore", country: "Singapore", continent: "Asia", aqi: 32, level: "good", lat: 1.3521, lng: 103.8198 },
  { name: "Dubai", country: "UAE", continent: "Asia", aqi: 88, level: "moderate", lat: 25.2048, lng: 55.2708 },
  { name: "Shanghai", country: "China", continent: "Asia", aqi: 135, level: "unhealthy", lat: 31.2304, lng: 121.4737 },
  { name: "Seoul", country: "South Korea", continent: "Asia", aqi: 92, level: "moderate", lat: 37.5665, lng: 126.9780 },
  { name: "Bangkok", country: "Thailand", continent: "Asia", aqi: 148, level: "unhealthy", lat: 13.7563, lng: 100.5018 },
  { name: "Jakarta", country: "Indonesia", continent: "Asia", aqi: 142, level: "unhealthy", lat: -6.2088, lng: 106.8456 },
  { name: "Hong Kong", country: "China", continent: "Asia", aqi: 75, level: "moderate", lat: 22.3193, lng: 114.1694 },
  
  // Europe
  { name: "London", country: "UK", continent: "Europe", aqi: 52, level: "moderate", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", country: "France", continent: "Europe", aqi: 48, level: "good", lat: 48.8566, lng: 2.3522 },
  { name: "Berlin", country: "Germany", continent: "Europe", aqi: 38, level: "good", lat: 52.5200, lng: 13.4050 },
  { name: "Madrid", country: "Spain", continent: "Europe", aqi: 61, level: "moderate", lat: 40.4168, lng: -3.7038 },
  { name: "Rome", country: "Italy", continent: "Europe", aqi: 65, level: "moderate", lat: 41.9028, lng: 12.4964 },
  { name: "Amsterdam", country: "Netherlands", continent: "Europe", aqi: 35, level: "good", lat: 52.3676, lng: 4.9041 },
  { name: "Warsaw", country: "Poland", continent: "Europe", aqi: 72, level: "moderate", lat: 52.2297, lng: 21.0122 },
  { name: "Stockholm", country: "Sweden", continent: "Europe", aqi: 28, level: "good", lat: 59.3293, lng: 18.0686 },
  { name: "Barcelona", country: "Spain", continent: "Europe", aqi: 58, level: "moderate", lat: 41.3851, lng: 2.1734 },
  
  // North America
  { name: "New York", country: "USA", continent: "North America", aqi: 42, level: "good", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", country: "USA", continent: "North America", aqi: 95, level: "moderate", lat: 34.0522, lng: -118.2437 },
  { name: "Mexico City", country: "Mexico", continent: "North America", aqi: 112, level: "unhealthy", lat: 19.4326, lng: -99.1332 },
  { name: "Toronto", country: "Canada", continent: "North America", aqi: 28, level: "good", lat: 43.6532, lng: -79.3832 },
  { name: "Chicago", country: "USA", continent: "North America", aqi: 48, level: "good", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", country: "USA", continent: "North America", aqi: 58, level: "moderate", lat: 29.7604, lng: -95.3698 },
  { name: "Vancouver", country: "Canada", continent: "North America", aqi: 25, level: "good", lat: 49.2827, lng: -123.1207 },
  { name: "Miami", country: "USA", continent: "North America", aqi: 38, level: "good", lat: 25.7617, lng: -80.1918 },
  
  // South America
  { name: "São Paulo", country: "Brazil", continent: "South America", aqi: 73, level: "moderate", lat: -23.5505, lng: -46.6333 },
  { name: "Buenos Aires", country: "Argentina", continent: "South America", aqi: 58, level: "moderate", lat: -34.6037, lng: -58.3816 },
  { name: "Lima", country: "Peru", continent: "South America", aqi: 82, level: "moderate", lat: -12.0464, lng: -77.0428 },
  { name: "Rio de Janeiro", country: "Brazil", continent: "South America", aqi: 68, level: "moderate", lat: -22.9068, lng: -43.1729 },
  { name: "Bogotá", country: "Colombia", continent: "South America", aqi: 78, level: "moderate", lat: 4.7110, lng: -74.0721 },
  { name: "Santiago", country: "Chile", continent: "South America", aqi: 88, level: "moderate", lat: -33.4489, lng: -70.6693 },
  
  // Africa
  { name: "Cairo", country: "Egypt", continent: "Africa", aqi: 168, level: "unhealthy", lat: 30.0444, lng: 31.2357 },
  { name: "Lagos", country: "Nigeria", continent: "Africa", aqi: 145, level: "unhealthy", lat: 6.5244, lng: 3.3792 },
  { name: "Johannesburg", country: "South Africa", continent: "Africa", aqi: 67, level: "moderate", lat: -26.2041, lng: 28.0473 },
  { name: "Nairobi", country: "Kenya", continent: "Africa", aqi: 92, level: "moderate", lat: -1.2921, lng: 36.8219 },
  { name: "Casablanca", country: "Morocco", continent: "Africa", aqi: 75, level: "moderate", lat: 33.5731, lng: -7.5898 },
  { name: "Cape Town", country: "South Africa", continent: "Africa", aqi: 52, level: "moderate", lat: -33.9249, lng: 18.4241 },
  
  // Oceania
  { name: "Sydney", country: "Australia", continent: "Oceania", aqi: 25, level: "good", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", country: "Australia", continent: "Oceania", aqi: 31, level: "good", lat: -37.8136, lng: 144.9631 },
  { name: "Auckland", country: "New Zealand", continent: "Oceania", aqi: 18, level: "good", lat: -36.8485, lng: 174.7633 },
  { name: "Brisbane", country: "Australia", continent: "Oceania", aqi: 28, level: "good", lat: -27.4698, lng: 153.0251 },
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
