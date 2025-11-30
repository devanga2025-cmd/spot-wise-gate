import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Car, Home } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const [parkingData, setParkingData] = useState<any>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const paymentComplete = localStorage.getItem("paymentComplete");
    
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    if (!paymentComplete) {
      navigate("/register");
      return;
    }

    const data = localStorage.getItem("parkingData");
    if (data) {
      setParkingData(JSON.parse(data));
    }

    // Clear payment flag
    localStorage.removeItem("paymentComplete");
  }, [navigate]);

  const handleBackHome = () => {
    localStorage.removeItem("parkingData");
    navigate("/home");
  };

  if (!parkingData) return null;

  const calculateAmount = () => {
    const hours = parseInt(parkingData.parkingHours) || 0;
    const baseRate = parkingData.carType === "electric" ? 50 : 40;
    return hours * baseRate;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-strong text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-electric mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-electric-foreground" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Parking Registered Successfully!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your parking spot has been confirmed and payment is complete
        </p>

        {/* Booking Details */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Car className="w-5 h-5" />
            Booking Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-semibold">{parkingData.ownerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Car Number</p>
              <p className="font-semibold">{parkingData.carNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Parking Spot</p>
              <p className="font-semibold text-primary">{parkingData.parkingSpot}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold">{parkingData.parkingHours} hours</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Car Type</p>
              <p className={`font-semibold capitalize ${parkingData.carType === "electric" ? "text-electric" : "text-normal"}`}>
                {parkingData.carType}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="font-semibold text-lg">₹{calculateAmount()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleBackHome}
            className="gradient-primary text-primary-foreground px-8"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("parkingData");
              navigate("/register");
            }}
            variant="outline"
            size="lg"
          >
            <Car className="w-4 h-4 mr-2" />
            Register Another Car
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          A confirmation has been sent. Please park your vehicle at spot {parkingData.parkingSpot}
        </p>
      </Card>
    </div>
  );
};

export default Success;
