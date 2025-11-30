"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBMI } from "@/contexts/bmi-context";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Utensils } from "lucide-react";
import { toast } from "sonner";

/**
 * Meal Recommender View - Step 3
 * 
 * Users provide eating preferences and location
 * Returns dummy list of dishes with restaurant addresses near the user
 */
export default function AIMealSuggestionsView() {
  const { bmiData } = useBMI();
  const router = useRouter();
  const [preferences, setPreferences] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetSuggestions = async () => {
    if (!preferences.trim()) {
      toast.error("Please enter your eating preferences");
      return;
    }
    if (!address.trim() || !city.trim()) {
      toast.error("Please enter your address and city");
      return;
    }

    setLoading(true);
    
    // Dummy response with restaurant recommendations
    setTimeout(() => {
      const dummyRestaurants = [
        {
          name: "Green Leaf Bistro",
          dish: "Grilled Chicken Salad Bowl",
          address: "123 Main Street",
          distance: "0.5 miles",
          cuisine: "Healthy",
          price: "$$",
          rating: 4.5,
        },
        {
          name: "Mediterranean Delight",
          dish: "Quinoa Power Bowl",
          address: "456 Oak Avenue",
          distance: "1.2 miles",
          cuisine: "Mediterranean",
          price: "$$",
          rating: 4.7,
        },
        {
          name: "Asian Fusion Kitchen",
          dish: "Teriyaki Salmon with Brown Rice",
          address: "789 Pine Road",
          distance: "0.8 miles",
          cuisine: "Asian",
          price: "$$$",
          rating: 4.6,
        },
        {
          name: "Veggie Paradise",
          dish: "Vegetable Stir Fry",
          address: "321 Elm Street",
          distance: "1.5 miles",
          cuisine: "Vegetarian",
          price: "$",
          rating: 4.4,
        },
        {
          name: "Protein House",
          dish: "Lean Beef with Sweet Potato",
          address: "654 Maple Drive",
          distance: "0.9 miles",
          cuisine: "American",
          price: "$$",
          rating: 4.8,
        },
      ];

      // Filter based on user goal if available
      let filteredRestaurants = dummyRestaurants;
      if (bmiData.goal && bmiData.goal === "lose") {
        filteredRestaurants = dummyRestaurants.filter(r => 
          r.dish.toLowerCase().includes("salad") || 
          r.dish.toLowerCase().includes("bowl") ||
          r.cuisine === "Healthy"
        );
      } else if (bmiData.goal === "gain") {
        filteredRestaurants = dummyRestaurants.filter(r => 
          r.dish.toLowerCase().includes("protein") || 
          r.dish.toLowerCase().includes("beef") ||
          r.cuisine === "American"
        );
      }

      setSuggestions(filteredRestaurants);
      setLoading(false);
      toast.success("Meal recommendations generated!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Meal Recommender - Step 3</CardTitle>
            <CardDescription className="text-base">
              Get personalized meal recommendations with restaurant locations near you based on your preferences and health goals.
            </CardDescription>
            {bmiData.goal && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Your Goal:</strong> {bmiData.goal === "lose" ? "Lose Weight" : bmiData.goal === "gain" ? "Gain Weight" : "Maintain Weight"}
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="preferences" className="text-base font-semibold">Your Eating Preferences</Label>
              <Textarea
                id="preferences"
                placeholder="e.g., Vegetarian, prefer spicy food, no dairy, love Italian cuisine..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-semibold">Street Address</Label>
                <Input
                  id="address"
                  placeholder="e.g., 123 Main Street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-semibold">City</Label>
                <Input
                  id="city"
                  placeholder="e.g., New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleGetSuggestions} 
              disabled={loading || !preferences.trim() || !address.trim() || !city.trim()}
              className="w-full"
              size="lg"
            >
              {loading ? "Generating Recommendations..." : "Get Meal Recommendations"}
            </Button>
            
            {suggestions && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold">Recommended Meals Near You</h3>
                <div className="space-y-4">
                  {suggestions.map((restaurant, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold mb-1">{restaurant.dish}</h4>
                            <p className="text-muted-foreground">{restaurant.name}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-yellow-500">★</span>
                              <span className="font-semibold">{restaurant.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{restaurant.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{restaurant.address}, {city}</span>
                          <span className="ml-auto">{restaurant.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{restaurant.cuisine} Cuisine</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={() => router.push("/healthy-recipes")}
                  className="w-full"
                  size="lg"
                >
                  Continue to Recipe Generator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
