import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, Clock, MapPin, CreditCard, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BookingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    ownerName: string;
    carNumber: string;
    parkingHours: string;
    carType: string;
    parkingSpot: string;
  };
}

const BookingSummaryModal = ({ isOpen, onClose, onConfirm, data }: BookingSummaryModalProps) => {
  const calculateAmount = () => {
    const hours = parseInt(data.parkingHours) || 0;
    const baseRate = data.carType === "electric" ? 50 : 40;
    return hours * baseRate;
  };

  const getDiscount = () => {
    const hours = parseInt(data.parkingHours) || 0;
    if (hours >= 24) return 20; // 20% discount for full day
    if (hours >= 12) return 10; // 10% discount for 12+ hours
    return 0;
  };

  const amount = calculateAmount();
  const discount = getDiscount();
  const finalAmount = amount - (amount * discount / 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Booking Summary</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Owner Details */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-semibold">{data.ownerName}</p>
            </div>
          </div>

          {/* Car Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Car Number</p>
              <p className="font-semibold text-sm">{data.carNumber}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Car Type</p>
              <div className="flex items-center gap-1">
                {data.carType === "electric" ? (
                  <Zap className="w-3 h-3 text-electric" />
                ) : (
                  <Car className="w-3 h-3 text-normal" />
                )}
                <p className={`font-semibold text-sm capitalize ${data.carType === "electric" ? "text-electric" : "text-normal"}`}>
                  {data.carType}
                </p>
              </div>
            </div>
          </div>

          {/* Parking Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Spot</p>
                <p className="font-semibold">{data.parkingSpot}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{data.parkingHours}h</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Amount</span>
              <span className="font-medium">₹{amount}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-electric">Discount ({discount}%)</span>
                <span className="font-medium text-electric">-₹{amount * discount / 100}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">₹{finalAmount}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Edit Details
          </Button>
          <Button
            onClick={onConfirm}
            className="gradient-primary text-primary-foreground"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSummaryModal;
