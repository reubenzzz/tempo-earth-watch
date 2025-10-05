import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import EarthVisualization from "@/components/EarthVisualization";
import LocationSearch from "@/components/LocationSearch";
import AirQualityCard from "@/components/AirQualityCard";
import HealthImpact from "@/components/HealthImpact";
import MajorCities from "@/components/MajorCities";
import FlightPredictions from "@/components/FlightPredictions";
import AnimalStatus from "@/components/AnimalStatus";
import MedicalFacilities from "@/components/MedicalFacilities";
import SpaceDebrisInfo from "@/components/SpaceDebrisInfo";
import { Button } from "@/components/ui/button";
import { LogOut, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState({ name: "Global View", lat: 0, lng: 0 });
  const [pollutionLevel, setPollutionLevel] = useState(45);

  // Mock air quality data - replace with real NASA TEMPO data
  const airQualityData = [
    { pollutant: "NO₂", value: 42, unit: "ppb", level: "moderate" as const, icon: "🌫️" },
    { pollutant: "PM2.5", value: 28, unit: "µg/m³", level: "good" as const, icon: "💨" },
    { pollutant: "O₃", value: 65, unit: "ppb", level: "moderate" as const, icon: "☁️" },
    { pollutant: "HCHO", value: 18, unit: "ppb", level: "good" as const, icon: "🌡️" },
  ];

  const handleLocationSelect = (location: { lat: number; lng: number; name: string }) => {
    setCurrentLocation(location);
    // Mock pollution level based on location
    setPollutionLevel(Math.floor(Math.random() * 100));
    toast({
      title: "Location updated",
      description: `Now showing data for ${location.name}`,
    });
  };

  const handleCitySelect = (city: any) => {
    setCurrentLocation({ name: city.name, lat: city.lat, lng: city.lng });
    setPollutionLevel(city.aqi);
    toast({
      title: "City selected",
      description: `Viewing air quality data for ${city.name}`,
    });
  };

  const handleRegionClick = (lat: number, lng: number) => {
    const regionName = `Region ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
    setCurrentLocation({ name: regionName, lat, lng });
    setPollutionLevel(Math.floor(Math.random() * 100));
    toast({
      title: "Region selected",
      description: `Exploring ${regionName}`,
    });
  };

  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const overallLevel = pollutionLevel < 50 ? "good" : pollutionLevel < 100 ? "moderate" : pollutionLevel < 150 ? "unhealthy" : "hazardous";

  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-earth flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Airo Space</h1>
              <p className="text-xs text-muted-foreground">Air Quality Monitoring</p>
            </div>
          </div>
          
          <Button onClick={handleLogout} variant="outline" className="border-primary/30 hover:bg-primary/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Current Location Info */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{currentLocation.name}</h2>
          <p className="text-muted-foreground">
            Real-time air quality data from NASA TEMPO satellite
          </p>
        </div>

        {/* Location Search */}
        <div className="max-w-2xl mx-auto">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        {/* 3D Earth Visualization - Interactive */}
        <div className="relative">
          <EarthVisualization 
            pollutionLevel={pollutionLevel} 
            onRegionClick={handleRegionClick}
            selectedLocation={currentLocation}
          />
        </div>

        {/* Air Quality Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {airQualityData.map((data) => (
            <AirQualityCard key={data.pollutant} data={data} />
          ))}
        </div>

        {/* Health Impact & Major Cities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthImpact airQualityLevel={overallLevel} />
          <MajorCities onCitySelect={handleCitySelect} />
        </div>

        {/* Flight Predictions & Animal Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlightPredictions pollutionLevel={pollutionLevel} location={currentLocation.name} />
          <AnimalStatus location={currentLocation.name} />
        </div>

        {/* Medical Facilities & Space Debris */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MedicalFacilities location={currentLocation.name} />
          <SpaceDebrisInfo />
        </div>

        {/* Info Footer */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Data Sources:</strong> NASA TEMPO satellite,
                OpenAQ ground sensors, AirNow, Pandora network, and MERRA-2 reanalysis data.
              </p>
              <p>
                This application integrates real-time satellite observations with ground-based
                measurements to provide accurate air quality forecasts and health recommendations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
