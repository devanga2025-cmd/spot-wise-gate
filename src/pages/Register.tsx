import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Car, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import BookingSummaryModal from "@/components/BookingSummaryModal";
import PricingCard from "@/components/PricingCard";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: "",
    carNumber: "",
    parkingHours: "",
    carType: "",
    parkingSpot: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  // Generate parking spots
  const parkingSpots = [
    { id: "A1", zone: "A", available: true },
    { id: "A2", zone: "A", available: true },
    { id: "A3", zone: "A", available: false },
    { id: "A4", zone: "A", available: true },
    { id: "B1", zone: "B", available: true },
    { id: "B2", zone: "B", available: true },
    { id: "B3", zone: "B", available: true },
    { id: "B4", zone: "B", available: false },
    { id: "C1", zone: "C", available: true },
    { id: "C2", zone: "C", available: false },
    { id: "C3", zone: "C", available: true },
    { id: "C4", zone: "C", available: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.ownerName || !formData.carNumber || !formData.parkingHours || !formData.carType || !formData.parkingSpot) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setShowSummary(true);
  };

  const handleConfirmBooking = () => {
    setIsLoading(true);
    // Store data in localStorage
    localStorage.setItem("parkingData", JSON.stringify(formData));

    setTimeout(() => {
      navigate("/payment");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary shadow-medium">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">Car Registration</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-8 shadow-medium animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-8">
            {/* Owner & Car Details */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Owner & Car Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    placeholder="Enter owner name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carNumber">Car Number</Label>
                  <Input
                    id="carNumber"
                    placeholder="e.g., MH 01 AB 1234"
                    value={formData.carNumber}
                    onChange={(e) => setFormData({ ...formData, carNumber: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parkingHours">Parking Hours</Label>
                  <Input
                    id="parkingHours"
                    type="number"
                    min="1"
                    placeholder="Number of hours"
                    value={formData.parkingHours}
                    onChange={(e) => setFormData({ ...formData, parkingHours: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carType">Car Type</Label>
                  <Select value={formData.carType} onValueChange={(value) => setFormData({ ...formData, carType: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electric">Electric Car</SelectItem>
                      <SelectItem value="normal">Normal Car</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Parking Spot Selection */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Select Parking Spot</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {parkingSpots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    disabled={!spot.available}
                    onClick={() => setFormData({ ...formData, parkingSpot: spot.id })}
                    className={cn(
                      "h-24 rounded-lg border-2 font-semibold transition-all",
                      "flex flex-col items-center justify-center gap-2",
                      spot.available
                        ? formData.parkingSpot === spot.id
                          ? formData.carType === "electric"
                            ? "border-electric bg-electric text-electric-foreground shadow-medium"
                            : "border-primary bg-primary text-primary-foreground shadow-medium"
                          : "border-border hover:border-primary hover:shadow-soft bg-card"
                        : "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    )}
                  >
                    <Car className={cn("w-6 h-6", !spot.available && "opacity-50")} />
                    <span className="text-lg">{spot.id}</span>
                    {!spot.available && <span className="text-xs">Occupied</span>}
                  </button>
                ))}
              </div>
            </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Review Booking"}
              </Button>
            </form>
          </Card>

          {/* Pricing Sidebar */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <PricingCard carType={formData.carType} parkingHours={formData.parkingHours} />
            
            {formData.parkingHours && parseInt(formData.parkingHours) >= 12 && (
              <Card className="p-4 bg-electric/5 border-electric/20">
                <p className="text-sm font-medium text-electric">
                  💡 Tip: Parking for {formData.parkingHours}+ hours? You're getting a special discount!
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <BookingSummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onConfirm={handleConfirmBooking}
        data={formData}
      />
    </div>
  );
};

export default Register;
