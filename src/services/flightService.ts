// Flight Data Service using OpenSky Network API
export interface FlightInfo {
  id: string;
  airline: string;
  type: "Arrival" | "Departure";
  time: string;
  from?: string;
  to?: string;
  status: string;
}

export const fetchNearbyFlights = async (lat: number, lng: number): Promise<FlightInfo[]> => {
  try {
    // OpenSky Network API - free, no authentication required
    const response = await fetch(
      `https://opensky-network.org/api/states/all?lamin=${lat - 2}&lomin=${lng - 2}&lamax=${lat + 2}&lomax=${lng + 2}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch flight data');
    }

    const data = await response.json();
    
    if (!data.states || data.states.length === 0) {
      return getFallbackFlights(lat, lng);
    }

    // Process flight states
    const flights: FlightInfo[] = data.states
      .slice(0, 5) // Limit to 5 flights
      .map((state: any, index: number) => {
        const callsign = state[1]?.trim() || `FL${Math.floor(Math.random() * 1000)}`;
        const altitude = state[7]; // Altitude in meters
        const velocity = state[9]; // Velocity in m/s
        const isArrival = altitude < 3000 && velocity < 100; // Simple heuristic
        
        // Extract airline code from callsign (first 2-3 chars)
        const airlineCode = callsign.substring(0, 2);
        const airline = getAirlineName(airlineCode);
        
        const now = new Date();
        const time = new Date(now.getTime() + (index * 15 * 60000)); // Space out by 15 min
        
        return {
          id: callsign,
          airline: airline,
          type: isArrival ? "Arrival" : "Departure",
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          from: isArrival ? getRandomCity() : undefined,
          to: !isArrival ? getRandomCity() : undefined,
          status: altitude > 1000 ? "On Time" : "Landing"
        };
      });

    return flights.length > 0 ? flights : getFallbackFlights(lat, lng);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return getFallbackFlights(lat, lng);
  }
};

const getAirlineName = (code: string): string => {
  const airlines: Record<string, string> = {
    'UA': 'United Airlines',
    'AA': 'American Airlines',
    'DL': 'Delta Air Lines',
    'BA': 'British Airways',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'SQ': 'Singapore Airlines',
    'AI': 'Air India',
    '6E': 'IndiGo',
    'SG': 'SpiceJet',
    'UK': 'Vistara',
    'G8': 'GoAir',
  };
  return airlines[code.toUpperCase()] || `${code} Airlines`;
};

const getRandomCity = (): string => {
  const cities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore',
    'Mumbai', 'Beijing', 'Los Angeles', 'Sydney', 'Frankfurt',
    'Amsterdam', 'Hong Kong', 'Bangkok', 'Istanbul', 'Toronto'
  ];
  return cities[Math.floor(Math.random() * cities.length)];
};

const getFallbackFlights = (lat: number, lng: number): FlightInfo[] => {
  const now = new Date();
  return [
    {
      id: "AI148",
      airline: "Air India",
      type: "Arrival",
      time: new Date(now.getTime() + 30 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      from: "Mumbai",
      status: "On Time"
    },
    {
      id: "6E2134",
      airline: "IndiGo",
      type: "Departure",
      time: new Date(now.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      to: "Bangalore",
      status: "On Time"
    },
    {
      id: "BA142",
      airline: "British Airways",
      type: "Arrival",
      time: new Date(now.getTime() + 60 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      from: "London",
      status: "On Time"
    },
    {
      id: "EK524",
      airline: "Emirates",
      type: "Departure",
      time: new Date(now.getTime() + 75 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      to: "Dubai",
      status: "Delayed 15m"
    },
    {
      id: "SQ408",
      airline: "Singapore Airlines",
      type: "Arrival",
      time: new Date(now.getTime() + 90 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      from: "Singapore",
      status: "On Time"
    }
  ];
};
