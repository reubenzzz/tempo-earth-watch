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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a location");
      return;
    }
    
    setIsLocating(true);
    
    try {
      // Using Nominatim OpenStreetMap geocoding API (free, no key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'AiroPulse-App/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding service unavailable');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        onLocationSelect({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
          name: location.display_name.split(',')[0] || searchQuery
        });
        toast.success(`Location found: ${location.display_name.split(',')[0]}`);
      } else {
        toast.error("Location not found. Try cities, villages, or specific addresses");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("Unable to search location. Please try again.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleAutoDetect = () => {
    setIsLocating(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationName = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
          
          onLocationSelect({
            lat: latitude,
            lng: longitude,
            name: locationName,
          });
          toast.success(`Location detected: ${locationName}`);
          setIsLocating(false);
        },
        (error) => {
          setIsLocating(false);
          let errorMessage = "Unable to access location.";
          
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable location permissions in your browser.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location unavailable. Please try again or search manually.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Location request timed out. Please try again.";
          }
          
          toast.error(errorMessage);
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
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
            placeholder="Search any city, village, or address worldwide"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-background/50"
          />
        </div>
        <Button onClick={handleSearch} disabled={isLocating} className="bg-primary hover:bg-primary/90">
          {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
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
