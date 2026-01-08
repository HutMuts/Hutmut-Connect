import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { 
  Home, 
  Search, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Bell, 
  Mail, 
  CheckCircle,
  Eye,
  Lock,
  Zap,
  UserCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { waitlistFormSchema } from "@shared/schema";

type UserType = "renter" | "landlord";

const formSchema = waitlistFormSchema;

export default function Landing() {
  const [userType, setUserType] = useState<UserType>("renter");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      userType: userType,
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "You're on the list!",
        description: "We'll be in touch soon with early access.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    waitlistMutation.mutate({ ...data, userType });
  };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Content based on user type
  const renterContent = {
    heroTitle: "Find Hidden Rentals Before Anyone Else",
    heroSubtitle: "Our local Scouts photograph 'For Rent' signs before they hit the market. Get notified instantly, connect directly with landlords, skip the competition.",
    howItWorks: [
      {
        icon: Search,
        title: "Scouts Find Properties",
        description: "Local Scouts photograph 'For Rent' signs in real neighborhoods, capturing hidden listings before they're posted online."
      },
      {
        icon: Bell,
        title: "You Get Notified",
        description: "Receive instant alerts about properties matching your criteria. Be the first to know, before the crowds arrive."
      },
      {
        icon: UserCheck,
        title: "Connect Directly",
        description: "Reach out directly to private landlords. No agents, no bidding wars, just a straightforward conversation."
      }
    ],
    benefits: [
      { icon: Eye, title: "Hidden Listings", description: "Access properties that never make it online" },
      { icon: Zap, title: "No Competition", description: "Be first in line, not one of hundreds" },
      { icon: Users, title: "Direct to Landlord", description: "Skip agents and connect personally" },
      { icon: ShieldCheck, title: "Scout-Verified", description: "Every property is real and verified" }
    ]
  };

  const landlordContent = {
    heroTitle: "Quality Tenants, Zero Hassle",
    heroSubtitle: "Stay private while our Scouts promote your property. Receive only verified, pre-qualified leads. No agencies, no spam calls.",
    howItWorks: [
      {
        icon: Lock,
        title: "List Privately",
        description: "Keep your listing off public platforms. Our Scouts verify your 'For Rent' sign and digitize it securely."
      },
      {
        icon: Sparkles,
        title: "Scouts Promote",
        description: "Local Scouts actively search for quality tenants looking for properties like yours in your neighborhood."
      },
      {
        icon: ShieldCheck,
        title: "Verified Leads Only",
        description: "Receive inquiries only from pre-qualified renters. No spam, no time-wasters, no large agencies."
      }
    ],
    benefits: [
      { icon: Lock, title: "Zero Spam", description: "Only receive serious, verified inquiries" },
      { icon: UserCheck, title: "Pre-Qualified", description: "Tenants are vetted before they contact you" },
      { icon: Building2, title: "No Agency Fees", description: "Connect directly without middlemen" },
      { icon: ShieldCheck, title: "Stay Private", description: "Your property stays off public listings" }
    ]
  };

  const content = userType === "renter" ? renterContent : landlordContent;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-foreground" data-testid="text-logo">Hutmuts</span>
            </div>

            {/* Persona Toggle - Center */}
            <div className="hidden sm:flex items-center justify-center">
              <PersonaToggle userType={userType} setUserType={setUserType} />
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden sm:block">
              <Button onClick={scrollToWaitlist} data-testid="button-join-waitlist-nav">
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden py-4 space-y-4 border-t border-border">
              <div className="flex justify-center">
                <PersonaToggle userType={userType} setUserType={setUserType} />
              </div>
              <div className="flex justify-center">
                <Button onClick={scrollToWaitlist} className="w-full max-w-xs" data-testid="button-join-waitlist-mobile">
                  Join Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
                data-testid="text-hero-title"
              >
                {content.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0" data-testid="text-hero-subtitle">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button 
                  size="lg" 
                  onClick={scrollToWaitlist}
                  className="text-base"
                  data-testid="button-get-early-access"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setUserType(userType === "renter" ? "landlord" : "renter")}
                  className="text-base"
                  data-testid="button-switch-persona"
                >
                  {userType === "renter" ? "I'm a Landlord" : "I'm a Renter"}
                </Button>
              </div>
            </div>

            {/* Right - Hero Image Area */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-md bg-card border border-card-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                      {userType === "renter" ? (
                        <Search className="w-12 h-12 text-primary" />
                      ) : (
                        <ShieldCheck className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      {userType === "renter" 
                        ? "Scouts discover hidden rentals" 
                        : "Connect with verified tenants"}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      {userType === "renter"
                        ? "Physical 'For Rent' signs photographed before they're listed online"
                        : "Your property stays private while Scouts bring quality leads"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating Stats - Map Markers with floating shadow */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-card border border-card-border rounded-md p-4 marker-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2,400+</p>
                    <p className="text-xs text-muted-foreground">Properties Found</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 sm:-right-8 bg-card border border-card-border rounded-md p-4 marker-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">850+</p>
                    <p className="text-xs text-muted-foreground">Active Scouts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-how-it-works-title">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {userType === "renter" 
                ? "Get access to hidden rentals in three simple steps" 
                : "Find quality tenants without the hassle"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {content.howItWorks.map((step, index) => (
              <Card key={index} className="relative bg-card border-card-border">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-step-${index + 1}-title`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-step-${index + 1}-description`}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-benefits-title">
              Why Choose Hutmuts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {userType === "renter" 
                ? "Skip the crowded listings and find your perfect home" 
                : "Connect with the right tenants, protect your privacy"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-card-border">
                <CardContent className="pt-6 pb-6 px-6 text-center">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-benefit-${index + 1}-title`}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-benefit-${index + 1}-description`}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-waitlist-title">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground">
              Be first to access {userType === "renter" ? "hidden rentals" : "verified leads"} when we launch.
            </p>
          </div>

          {isSuccess ? (
            <Card className="bg-card border-card-border">
              <CardContent className="py-12 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-success-title">
                  You're on the list!
                </h3>
                <p className="text-muted-foreground" data-testid="text-success-message">
                  We'll be in touch soon with early access details.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card border-card-border">
              <CardContent className="py-8 px-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              {...field} 
                              data-testid="input-name"
                              className="bg-background border-border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="you@example.com" 
                              {...field}
                              data-testid="input-email"
                              className="bg-background border-border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <FormLabel className="text-foreground">I am a...</FormLabel>
                      <div className="flex justify-center">
                        <PersonaToggle userType={userType} setUserType={setUserType} />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={waitlistMutation.isPending}
                      data-testid="button-submit-waitlist"
                    >
                      {waitlistMutation.isPending ? (
                        <>
                          <span className="animate-pulse">Joining...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Join the Waitlist
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-foreground">Hutmuts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Digitizing physical 'For Rent' signs. Connecting renters to hidden properties, protecting landlords from spam.
              </p>
            </div>

            {/* For Renters */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Renters</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Find Hidden Listings</li>
                <li>Connect with Landlords</li>
                <li>Skip the Competition</li>
              </ul>
            </div>

            {/* For Landlords */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Landlords</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Verified Leads Only</li>
                <li>No Agency Fees</li>
                <li>Stay Private</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  hello@hutmuts.com
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Hutmuts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Persona Toggle Component
function PersonaToggle({ 
  userType, 
  setUserType 
}: { 
  userType: UserType; 
  setUserType: (type: UserType) => void;
}) {
  return (
    <div 
      className="inline-flex items-center bg-muted rounded-full p-1"
      role="tablist"
      aria-label="Select user type"
    >
      <button
        role="tab"
        aria-selected={userType === "renter"}
        onClick={() => setUserType("renter")}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          userType === "renter"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
        data-testid="button-toggle-renter"
      >
        Renter
      </button>
      <button
        role="tab"
        aria-selected={userType === "landlord"}
        onClick={() => setUserType("landlord")}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          userType === "landlord"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
        data-testid="button-toggle-landlord"
      >
        Landlord
      </button>
    </div>
  );
}
