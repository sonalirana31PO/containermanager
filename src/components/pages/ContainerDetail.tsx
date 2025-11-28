import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  MapPin,
  Battery,
  Thermometer,
  Calendar,
  AlertTriangle,
  FileText,
  Phone,
} from "lucide-react";
import {
  mockContainers,
  generateTemperatureData,
  mockAlerts,
} from "@/lib/mockData";
import { StatusChip } from "@/components/StatusChip";
import { SensorChart } from "@/components/SensorChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function ContainerDetail() {
  const { containerId } = useParams<{ containerId: string }>();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"24h" | "48h" | "7d">("24h");

  const container = mockContainers.find((c) => c.id === containerId);
  const temperatureData = containerId
    ? generateTemperatureData(containerId)
    : [];
  const containerAlerts = mockAlerts.filter(
    (alert) => alert.containerId === containerId
  );

  if (!container) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="mb-4 text-muted-foreground">Container not found</p>
          <Button variant="link" onClick={() => navigate("/containers")}>
            Back to Container List
          </Button>
        </CardContent>
      </Card>
    );
  }

  const thresholds =
    container.type === "RKN" ? { min: 2, max: 8 } : { min: 15, max: 25 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/containers")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-mono">{container.id}</h1>
              <StatusChip status={container.status} />
              <Badge variant="outline">{container.type}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              AWB: {container.awb} • {container.origin} → {container.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>Edit Details</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content - Charts */}
        <div className="space-y-6 lg:col-span-2">
          {/* Temperature Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Temperature Monitoring</CardTitle>
                  <CardDescription>
                    Real-time sensor data • Updates every 5 minutes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {(["24h", "48h", "7d"] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <SensorChart
                  data={temperatureData}
                  thresholds={thresholds}
                  timeRange={timeRange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Journey Map */}
          <Card>
            <CardHeader>
              <CardTitle>Journey Progress</CardTitle>
              <CardDescription>
                Current route: {container.origin} → {container.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative py-8">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border" />
                <div className="relative flex items-center justify-between">
                  {container.route.map((airport, index) => {
                    const isOrigin = index === 0;
                    const isDestination = index === container.route.length - 1;
                    const isCurrent = container.currentLocation.includes(airport);
                    const isPassed = index < container.route.findIndex(a =>
                      container.currentLocation.includes(a)
                    );

                    return (
                      <div key={airport} className="flex flex-col items-center">
                        <div
                          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                            isCurrent
                              ? "bg-primary text-primary-foreground"
                              : isOrigin || isPassed
                                ? "bg-green-500 text-white"
                                : isDestination
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="font-mono text-sm font-medium">
                            {airport}
                          </p>
                          {isOrigin && (
                            <p className="text-xs text-muted-foreground">
                              Origin
                            </p>
                          )}
                          {isDestination && (
                            <p className="text-xs text-muted-foreground">
                              Destination
                            </p>
                          )}
                          {isCurrent && (
                            <p className="text-xs font-medium text-primary">
                              Current
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts History */}
          {containerAlerts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Alert History
                </CardTitle>
                <CardDescription>
                  {containerAlerts.length} alerts recorded for this container
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {containerAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-lg border p-4 ${
                        alert.severity === "critical"
                          ? "border-red-200 bg-red-50"
                          : "border-orange-200 bg-orange-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          className={`mt-0.5 h-5 w-5 ${
                            alert.severity === "critical"
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-medium capitalize">
                              {alert.type}
                            </span>
                            <StatusChip status={alert.severity === "info" ? "neutral" : alert.severity} />
                          </div>
                          <p className="mb-1 text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Metadata */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    Current Temperature
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      Math.abs(container.temperature - container.setPoint) > 2
                        ? "text-destructive"
                        : ""
                    }`}
                  >
                    {container.temperature}°C
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Set Point: {container.setPoint}°C
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Battery className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Battery Level</p>
                  <div className="mt-1">
                    <Progress value={container.battery} className="h-2" />
                    <p
                      className={`mt-1 text-lg font-semibold ${
                        container.battery < 30
                          ? "text-destructive"
                          : container.battery < 50
                            ? "text-orange-500"
                            : ""
                      }`}
                    >
                      {container.battery}%
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    Current Location
                  </p>
                  <p className="text-lg font-semibold">
                    {container.currentLocation}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last seen: {new Date(container.lastSeen).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Container Details */}
          <Card>
            <CardHeader>
              <CardTitle>Container Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Container Type
                </p>
                <p className="font-medium">{container.type}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Air Waybill
                </p>
                <p className="font-mono text-sm">{container.awb}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Route</p>
                <p className="font-medium">
                  {container.origin} → {container.destination}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Lease Start Date
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(container.leaseStart).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Next Maintenance
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(container.nextMaintenance).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Temperature Log
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Compliance Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
