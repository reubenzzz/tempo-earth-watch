import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Phone, Clock } from "lucide-react";

interface MedicalFacilitiesProps {
  location: string;
}

const MedicalFacilities = ({ location }: MedicalFacilitiesProps) => {
  const facilities = [
    {
      name: "Apollo Pharmacy",
      type: "Pharmacy",
      distance: "0.2 km",
      hasInhalers: true,
      phone: "+91 1800-123-1234",
      hours: "24/7",
      address: "MG Road, Sector 15",
      inhalerTypes: "Salbutamol, Budecort, Asthalin",
      rating: 4.5
    },
    {
      name: "Max Super Specialty Hospital",
      type: "Hospital",
      distance: "0.8 km",
      hasInhalers: true,
      phone: "+91 11-2651-5050",
      hours: "24/7 Emergency",
      address: "Saket, Press Enclave Road",
      inhalerTypes: "Full Stock Available",
      rating: 4.7
    },
    {
      name: "MedPlus Pharmacy",
      type: "Pharmacy",
      distance: "0.4 km",
      hasInhalers: true,
      phone: "+91 1800-102-6633",
      hours: "8 AM - 11 PM",
      address: "Connaught Place",
      inhalerTypes: "Asthalin, Seroflo, Levolin",
      rating: 4.3
    },
    {
      name: "Fortis Healthcare",
      type: "Hospital",
      distance: "1.2 km",
      hasInhalers: true,
      phone: "+91 11-4277-6222",
      hours: "24/7",
      address: "Vasant Kunj",
      inhalerTypes: "All Types Available",
      rating: 4.8
    },
    {
      name: "1mg Medical Store",
      type: "Pharmacy",
      distance: "0.6 km",
      hasInhalers: true,
      phone: "+91 1800-103-1088",
      hours: "9 AM - 10 PM",
      address: "Nehru Place",
      inhalerTypes: "Levolin, Foracort, Duolin",
      rating: 4.4
    },
    {
      name: "AIIMS Respiratory Clinic",
      type: "Clinic",
      distance: "1.5 km",
      hasInhalers: true,
      phone: "+91 11-2659-3333",
      hours: "8 AM - 8 PM",
      address: "Ansari Nagar East",
      inhalerTypes: "Generic & Branded",
      rating: 4.6
    },
    {
      name: "Wellness Forever Pharmacy",
      type: "Pharmacy",
      distance: "0.9 km",
      hasInhalers: true,
      phone: "+91 22-6806-6806",
      hours: "24/7",
      address: "Lajpat Nagar",
      inhalerTypes: "Budamate, Duolin, Seroflo",
      rating: 4.2
    },
    {
      name: "Columbia Asia Hospital",
      type: "Emergency",
      distance: "2.1 km",
      hasInhalers: true,
      phone: "+91 11-4366-6666",
      hours: "24/7",
      address: "Palam Vihar, Gurgaon",
      inhalerTypes: "Full Range Stocked",
      rating: 4.5
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Hospital": return "bg-primary";
      case "Emergency": return "bg-destructive";
      case "Pharmacy": return "bg-success";
      case "Clinic": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Medical Facilities & Asthma Care
        </CardTitle>
        <CardDescription>
          Nearby medical facilities with inhaler availability in {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 border border-primary/10 hover:shadow-glow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{facility.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-warning">★</span>
                        <span className="text-xs text-muted-foreground">{facility.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{facility.address}</p>
                    {facility.hasInhalers && (
                      <p className="text-xs text-success">📦 {facility.inhalerTypes}</p>
                    )}
                  </div>
                  <Badge className={`${getTypeColor(facility.type)} text-xs`}>
                    {facility.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm pt-3 border-t border-primary/10">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium">{facility.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-success" />
                    <span className="text-xs font-medium text-success">{facility.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs">Call</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Emergency Note:</strong> If experiencing severe asthma symptoms, 
            call emergency services immediately or visit the nearest emergency facility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalFacilities;
