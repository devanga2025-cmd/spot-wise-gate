import { Card } from "@/components/ui/card";
import { Car, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  carType: string;
  parkingHours: string;
}

const PricingCard = ({ carType, parkingHours }: PricingCardProps) => {
  const calculateAmount = () => {
    const hours = parseInt(parkingHours) || 0;
    const baseRate = carType === "electric" ? 50 : 40;
    return hours * baseRate;
  };

  const getDiscount = () => {
    const hours = parseInt(parkingHours) || 0;
    if (hours >= 24) return 20;
    if (hours >= 12) return 10;
    return 0;
  };

  const amount = calculateAmount();
  const discount = getDiscount();
  const finalAmount = amount - (amount * discount / 100);

  if (!parkingHours || !carType) return null;

  return (
    <Card className="p-4 shadow-soft border-2 border-primary/20 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {carType === "electric" ? (
            <div className="w-8 h-8 rounded-full gradient-electric flex items-center justify-center">
              <Zap className="w-4 h-4 text-electric-foreground" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-normal flex items-center justify-center">
              <Car className="w-4 h-4 text-normal-foreground" />
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">Estimated Cost</p>
            <p className="text-sm font-semibold capitalize">{carType} Car</p>
          </div>
        </div>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            ₹{carType === "electric" ? "50" : "40"} × {parkingHours}h
          </span>
          <span className="text-lg font-bold">₹{amount}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center p-2 rounded bg-electric/10">
            <span className="text-xs font-medium text-electric">
              🎉 {discount}% Discount Applied
            </span>
            <span className="text-sm font-semibold text-electric">-₹{amount * discount / 100}</span>
          </div>
        )}

        <div className={cn(
          "flex justify-between items-center pt-2 border-t",
          discount > 0 && "text-electric"
        )}>
          <span className="font-semibold">Total Amount</span>
          <span className="text-2xl font-bold">₹{finalAmount}</span>
        </div>
      </div>
    </Card>
  );
};

export default PricingCard;
