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
      name: "City Medical Center",
      type: "Hospital",
      distance: "0.8 km",
      hasInhalers: true,
      phone: "+1 555-0100",
      hours: "24/7",
      address: "123 Medical Plaza"
    },
    {
      name: "HealthPlus Pharmacy",
      type: "Pharmacy",
      distance: "0.3 km",
      hasInhalers: true,
      phone: "+1 555-0201",
      hours: "8 AM - 10 PM",
      address: "45 Main Street"
    },
    {
      name: "QuickCare Clinic",
      type: "Clinic",
      distance: "1.2 km",
      hasInhalers: true,
      phone: "+1 555-0302",
      hours: "9 AM - 6 PM",
      address: "789 Health Avenue"
    },
    {
      name: "MediStop Pharmacy",
      type: "Pharmacy",
      distance: "1.5 km",
      hasInhalers: true,
      phone: "+1 555-0403",
      hours: "7 AM - 11 PM",
      address: "321 Wellness Blvd"
    },
    {
      name: "Emergency Care Plus",
      type: "Emergency",
      distance: "2.1 km",
      hasInhalers: true,
      phone: "+1 555-0504",
      hours: "24/7",
      address: "567 Care Street"
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
                className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors border border-primary/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{facility.name}</h3>
                      {facility.hasInhalers && (
                        <Badge variant="default" className="text-xs">
                          Inhalers Available
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{facility.address}</p>
                  </div>
                  <Badge className={getTypeColor(facility.type)}>
                    {facility.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs">{facility.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs">{facility.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-xs">{facility.phone}</span>
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
