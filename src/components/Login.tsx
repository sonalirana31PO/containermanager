import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Package,
  Building2,
  UserCircle,
  Thermometer,
  MapPin,
  Shield,
  ArrowRight,
} from "lucide-react";

interface LoginProps {
  onLogin: (role: "customer" | "admin") => void;
}

export function Login({ onLogin }: LoginProps) {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(activeTab);
    }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand & Features */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-12 lg:flex">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/25">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                DoKaSch
              </h1>
              <p className="text-sm text-stone-400">Logistics Platform</p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
              Real-time cold chain
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                visibility & control
              </span>
            </h2>
            <p className="max-w-md text-lg text-stone-400">
              Monitor temperature-sensitive shipments worldwide with precision
              tracking and instant alerts.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Thermometer,
                label: "Temperature Monitoring",
                value: "±0.1°C accuracy",
              },
              {
                icon: MapPin,
                label: "Global Tracking",
                value: "Real-time GPS",
              },
              {
                icon: Shield,
                label: "Compliance Ready",
                value: "GDP certified",
              },
              {
                icon: Package,
                label: "Active Fleet",
                value: "45+ units",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-xl border border-stone-700/50 bg-stone-800/50 p-4 transition-all hover:border-teal-500/30 hover:bg-stone-800"
              >
                <feature.icon className="mb-2 h-5 w-5 text-teal-400" />
                <p className="text-sm font-medium text-white">{feature.label}</p>
                <p className="text-xs text-stone-500">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-6 text-sm text-stone-500">
          <span>© 2024 DoKaSch</span>
          <span className="h-1 w-1 rounded-full bg-stone-600" />
          <a href="#" className="hover:text-stone-300">
            Privacy
          </a>
          <span className="h-1 w-1 rounded-full bg-stone-600" />
          <a href="#" className="hover:text-stone-300">
            Terms
          </a>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full flex-col justify-center bg-stone-50 px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">DoKaSch</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">
              Welcome back
            </h2>
            <p className="mt-2 text-stone-600">
              Sign in to access your logistics dashboard
            </p>
          </div>

          {/* Login Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "customer" | "admin")}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-2 bg-stone-100 p-1">
              <TabsTrigger
                value="customer"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Building2 className="h-4 w-4" />
                Client Portal
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <UserCircle className="h-4 w-4" />
                Staff Access
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-12 border-stone-200 bg-white px-4 transition-colors focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-stone-700">
                      Password
                    </Label>
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-xs text-teal-600 hover:text-teal-700"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 border-stone-200 bg-white px-4 transition-colors focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-50"
                  >
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full bg-gradient-to-r from-teal-600 to-teal-500 text-base font-medium shadow-lg shadow-teal-500/25 transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl hover:shadow-teal-500/30"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-stone-500">
                  Need an account?{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    Contact your administrator
                  </Button>
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Demo hint */}
          <Card className="mt-8 border-dashed border-stone-300 bg-stone-100/50">
            <CardContent className="py-3 text-center">
              <p className="text-sm text-stone-500">
                <span className="font-medium text-stone-600">Demo Mode</span>
                {" — "}
                Enter any credentials to continue
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
