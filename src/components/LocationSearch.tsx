import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a location");
      return;
    }
    
    // Mock location search - replace with real geocoding API
    const mockLocations: Record<string, { lat: number; lng: number }> = {
      "new york": { lat: 40.7128, lng: -74.0060 },
      "london": { lat: 51.5074, lng: -0.1278 },
      "tokyo": { lat: 35.6762, lng: 139.6503 },
      "paris": { lat: 48.8566, lng: 2.3522 },
      "sydney": { lat: -33.8688, lng: 151.2093 },
      "mumbai": { lat: 19.0760, lng: 72.8777 },
      "beijing": { lat: 39.9042, lng: 116.4074 },
      "dubai": { lat: 25.2048, lng: 55.2708 },
      "singapore": { lat: 1.3521, lng: 103.8198 },
      "los angeles": { lat: 34.0522, lng: -118.2437 },
    };

    const location = mockLocations[searchQuery.toLowerCase()];
    if (location) {
      onLocationSelect({ ...location, name: searchQuery });
      toast.success(`Location set to ${searchQuery}`);
    } else {
      toast.error("Location not found. Try major cities like New York, London, Tokyo");
    }
  };

  const handleAutoDetect = () => {
    setIsLocating(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSelect({
            lat: latitude,
            lng: longitude,
            name: "Current Location",
          });
          toast.success("Location detected successfully");
          setIsLocating(false);
        },
        (error) => {
          toast.error("Unable to access location. Please check permissions.");
          setIsLocating(false);
          console.error(error);
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser");
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search location (e.g., New York, Tokyo)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-background/50"
          />
        </div>
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
          Search
        </Button>
      </div>

      <Button
        onClick={handleAutoDetect}
        disabled={isLocating}
        variant="outline"
        className="w-full border-primary/30 hover:bg-primary/10"
      >
        {isLocating ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Detecting Location...
          </>
        ) : (
          <>
            <MapPin className="mr-2 w-4 h-4" />
            Use My Current Location
          </>
        )}
      </Button>
    </div>
  );
};

export default LocationSearch;
