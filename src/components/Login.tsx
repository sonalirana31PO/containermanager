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

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-stone-50 px-4 text-stone-500">or continue with</span>
                  </div>
                </div>

                {/* Google Sign-In Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 w-full border-stone-300 bg-white text-base font-medium text-stone-700 transition-all hover:bg-stone-50 hover:border-stone-400"
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
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
