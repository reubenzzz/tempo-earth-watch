// Air Quality Data Service using OpenAQ API
export interface AirQualityReading {
  pollutant: string;
  value: number;
  unit: string;
  level: "good" | "moderate" | "unhealthy" | "hazardous";
  icon: string;
}

const pollutantIcons: Record<string, string> = {
  no2: "🌫️",
  pm25: "💨",
  o3: "☁️",
  pm10: "🌪️",
  so2: "🌡️",
  co: "⚗️",
};

const calculateLevel = (pollutant: string, value: number): "good" | "moderate" | "unhealthy" | "hazardous" => {
  // AQI breakpoints for common pollutants
  const breakpoints: Record<string, number[]> = {
    pm25: [12, 35.4, 55.4, 150.4],
    pm10: [54, 154, 254, 354],
    o3: [54, 70, 85, 105],
    no2: [53, 100, 360, 649],
    so2: [35, 75, 185, 304],
    co: [4.4, 9.4, 12.4, 15.4],
  };

  const limits = breakpoints[pollutant.toLowerCase()] || [50, 100, 150, 200];
  
  if (value <= limits[0]) return "good";
  if (value <= limits[1]) return "moderate";
  if (value <= limits[2]) return "unhealthy";
  return "hazardous";
};

export const fetchAirQualityData = async (lat: number, lng: number): Promise<AirQualityReading[]> => {
  try {
    // Use edge function to avoid CORS issues
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-air-quality`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ lat, lng })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      // Return fallback data if no readings available
      return getFallbackData();
    }

    // Aggregate measurements by parameter
    const aggregated: Record<string, { sum: number; count: number; unit: string }> = {};
    
    data.results.forEach((location: any) => {
      location.measurements?.forEach((measurement: any) => {
        const param = measurement.parameter.toLowerCase();
        if (!aggregated[param]) {
          aggregated[param] = { sum: 0, count: 0, unit: measurement.unit };
        }
        aggregated[param].sum += measurement.value;
        aggregated[param].count += 1;
      });
    });

    // Convert to air quality readings
    const readings: AirQualityReading[] = [];
    const priorityPollutants = ['no2', 'pm25', 'o3', 'pm10'];
    
    priorityPollutants.forEach(pollutant => {
      if (aggregated[pollutant]) {
        const avgValue = aggregated[pollutant].sum / aggregated[pollutant].count;
        readings.push({
          pollutant: pollutant === 'pm25' ? 'PM2.5' : pollutant === 'pm10' ? 'PM10' : pollutant.toUpperCase(),
          value: Math.round(avgValue * 10) / 10,
          unit: aggregated[pollutant].unit,
          level: calculateLevel(pollutant, avgValue),
          icon: pollutantIcons[pollutant] || "🌡️"
        });
      }
    });

    // If we have less than 4 readings, fill with available data
    if (readings.length < 4) {
      Object.keys(aggregated).forEach(pollutant => {
        if (!priorityPollutants.includes(pollutant) && readings.length < 4) {
          const avgValue = aggregated[pollutant].sum / aggregated[pollutant].count;
          readings.push({
            pollutant: pollutant.toUpperCase(),
            value: Math.round(avgValue * 10) / 10,
            unit: aggregated[pollutant].unit,
            level: calculateLevel(pollutant, avgValue),
            icon: pollutantIcons[pollutant] || "🌡️"
          });
        }
      });
    }

    return readings.length > 0 ? readings : getFallbackData();
  } catch (error) {
    console.error('Error fetching air quality:', error);
    return getFallbackData();
  }
};

const getFallbackData = (): AirQualityReading[] => {
  return [
    { pollutant: "NO₂", value: 42, unit: "ppb", level: "moderate", icon: "🌫️" },
    { pollutant: "PM2.5", value: 28, unit: "µg/m³", level: "good", icon: "💨" },
    { pollutant: "O₃", value: 65, unit: "ppb", level: "moderate", icon: "☁️" },
    { pollutant: "PM10", value: 45, unit: "µg/m³", level: "good", icon: "🌪️" },
  ];
};

export const calculateOverallAQI = (readings: AirQualityReading[]): number => {
  // Simple AQI calculation based on worst pollutant level
  const levelScores = { good: 25, moderate: 60, unhealthy: 120, hazardous: 180 };
  const maxScore = Math.max(...readings.map(r => levelScores[r.level]));
  return maxScore;
};
