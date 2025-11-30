import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, LogOut, PlusCircle, Clock, MapPin } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary shadow-medium">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">ParkEase</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Welcome to Your Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Manage your parking seamlessly with our smart system
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 shadow-medium hover:shadow-strong transition-all hover:scale-[1.02] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <PlusCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Register New Parking</h3>
                  <p className="text-muted-foreground mb-4">
                    Book a parking spot for your vehicle quickly and easily
                  </p>
                  <Button
                    onClick={() => navigate("/register")}
                    className="gradient-primary text-primary-foreground"
                  >
                    Register Car
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-electric animate-pulse-slow" />
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium text-foreground">45 Available Spots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-normal animate-pulse-slow" />
                      <Car className="w-4 h-4" />
                      <span>Electric & Normal Cars</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-full gradient-electric mx-auto mb-4 flex items-center justify-center">
                <Car className="w-6 h-6 text-electric-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Smart Parking</h3>
              <p className="text-sm text-muted-foreground">
                Real-time spot availability and booking
              </p>
            </Card>

            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 rounded-full bg-normal mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-normal-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">
                Book parking for any duration you need
              </p>
            </Card>

            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="w-12 h-12 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Premium Spots</h3>
              <p className="text-sm text-muted-foreground">
                Choose from multiple parking zones
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
