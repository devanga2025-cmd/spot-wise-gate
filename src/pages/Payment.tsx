import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Car, ArrowLeft, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [parkingData, setParkingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"phonepe" | "card">("phonepe");

  // PhonePe form
  const [phonePeData, setPhonePeData] = useState({
    upiId: "",
  });

  // Card form
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const data = localStorage.getItem("parkingData");
    if (!data) {
      navigate("/register");
      return;
    }

    setParkingData(JSON.parse(data));
  }, [navigate]);

  const calculateAmount = () => {
    if (!parkingData) return 0;
    const hours = parseInt(parkingData.parkingHours) || 0;
    const baseRate = parkingData.carType === "electric" ? 50 : 40;
    return hours * baseRate;
  };

  const handlePayment = () => {
    setIsLoading(true);

    // Validation
    if (paymentMethod === "phonepe" && !phonePeData.upiId) {
      toast({
        title: "Error",
        description: "Please enter UPI ID",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardName) {
        toast({
          title: "Error",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem("paymentComplete", "true");
      navigate("/success");
    }, 2000);
  };

  if (!parkingData) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary shadow-medium">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/register")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">Payment</h1>
          </div>
        </div>
      </header>

      {/* Payment */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Summary Card */}
        <Card className="p-6 shadow-medium h-fit animate-fade-in-up">
          <h2 className="text-xl font-display font-bold mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-medium">{parkingData.ownerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Car Number</span>
                <span className="font-medium">{parkingData.carNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Parking Spot</span>
                <span className="font-medium">{parkingData.parkingSpot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Car Type</span>
                <span className={`font-medium capitalize ${parkingData.carType === "electric" ? "text-electric" : "text-normal"}`}>
                  {parkingData.carType}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{parkingData.parkingHours} hours</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{calculateAmount()}</span>
              </div>
            </div>
          </Card>

      {/* Payment Methods */}
      <Card className="p-6 shadow-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-xl font-display font-bold mb-6">Payment Method</h2>

            {/* Method Selector */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("phonepe")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === "phonepe"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-semibold">PhonePe</span>
              </button>

              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="font-semibold">Card</span>
              </button>
            </div>

            {/* PhonePe Payment */}
            {paymentMethod === "phonepe" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={phonePeData.upiId}
                    onChange={(e) => setPhonePeData({ upiId: e.target.value })}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
                >
                  {isLoading ? "Processing..." : `Pay ₹${calculateAmount()}`}
                </Button>
              </div>
            )}

            {/* Card Payment */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={cardData.expiryDate}
                      onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="JOHN DOE"
                    value={cardData.cardName}
                    onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
                >
                  {isLoading ? "Processing..." : `Pay ₹${calculateAmount()}`}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Payment;
