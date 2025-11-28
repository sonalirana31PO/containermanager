import { useNavigate } from "react-router-dom";
import { KPITile } from "@/components/KPITile";
import { StatusChip } from "@/components/StatusChip";
import {
  Package,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowRight,
  MapPin,
  Thermometer,
  Battery,
  Globe,
} from "lucide-react";
import { mockContainers, mockAlerts } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardProps {
  onContainerSelect: (containerId: string) => void;
}

export function Dashboard({ onContainerSelect }: DashboardProps) {
  const navigate = useNavigate();

  const criticalAlerts = mockAlerts.filter((a) => a.severity === "critical").length;
  const warningAlerts = mockAlerts.filter((a) => a.severity === "warning").length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Good morning, welcome back
          </h2>
          <p className="mt-1 text-stone-500">
            Here's what's happening with your shipments today.
          </p>
        </div>
        <button
          onClick={() => navigate("/shipments")}
          className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-500/30"
        >
          <Package className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPITile
          title="Active Shipments"
          value={mockContainers.length}
          icon={Package}
          trend="up"
          subtitle="+2 from last week"
        />
        <KPITile
          title="Critical Alerts"
          value={criticalAlerts}
          icon={AlertTriangle}
          trend={criticalAlerts > 0 ? "up" : "flat"}
          subtitle="Requires immediate action"
          variant={criticalAlerts > 0 ? "destructive" : "default"}
        />
        <KPITile
          title="Warning Alerts"
          value={warningAlerts}
          icon={AlertTriangle}
          trend="flat"
          subtitle="Monitor closely"
          variant={warningAlerts > 0 ? "warning" : "default"}
        />
        <KPITile
          title="Avg Transit Time"
          value="8.5 days"
          icon={Clock}
          trend="down"
          subtitle="-0.5 days vs last month"
          variant="success"
        />
      </div>

      {/* Map and Alerts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Map Widget */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10">
                <Globe className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Global Container Map</h3>
                <p className="text-sm text-stone-500">Real-time location tracking</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:border-teal-300 hover:text-teal-600">
              View Full Map
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative h-80 bg-gradient-to-br from-stone-50 to-stone-100">
            {/* Stylized map background */}
            <div className="absolute inset-0 opacity-50">
              <svg viewBox="0 0 800 400" className="h-full w-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d6d3d1" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simplified world map */}
                <path
                  d="M 80 120 Q 120 100 180 110 Q 240 90 280 130 Q 250 180 200 200 Q 140 190 100 160 Z"
                  fill="#0d9488"
                  opacity="0.15"
                />
                <path
                  d="M 320 90 Q 420 70 550 100 Q 620 130 580 200 Q 500 220 400 190 Q 340 150 320 90 Z"
                  fill="#0d9488"
                  opacity="0.15"
                />
                <path
                  d="M 620 100 Q 700 80 760 120 Q 750 180 700 200 Q 650 190 620 150 Z"
                  fill="#0d9488"
                  opacity="0.15"
                />
                <path
                  d="M 150 250 Q 200 230 250 270 Q 230 320 180 330 Q 140 310 150 250 Z"
                  fill="#0d9488"
                  opacity="0.1"
                />
              </svg>
            </div>

            {/* Container markers */}
            {[
              { id: "OC-2403", status: "ok", location: "Dubai", top: "30%", left: "55%" },
              { id: "OC-2401", status: "warning", location: "In Transit", top: "35%", left: "35%" },
              { id: "OC-2404", status: "critical", location: "In Transit", top: "55%", left: "25%" },
              { id: "OC-2402", status: "ok", location: "Singapore", top: "50%", left: "75%" },
              { id: "OC-2405", status: "ok", location: "Tokyo", top: "25%", left: "85%" },
            ].map((marker, idx) => (
              <div
                key={idx}
                className="group absolute"
                style={{ top: marker.top, left: marker.left }}
              >
                <button
                  onClick={() => onContainerSelect(marker.id)}
                  className={`relative flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-150 ${
                    marker.status === "ok"
                      ? "bg-emerald-500"
                      : marker.status === "warning"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                >
                  <span className="absolute h-full w-full animate-ping rounded-full bg-current opacity-30" />
                </button>
                <div className="absolute bottom-full left-1/2 z-10 mb-3 hidden -translate-x-1/2 rounded-lg border border-stone-200 bg-white px-3 py-2 shadow-lg group-hover:block">
                  <p className="whitespace-nowrap font-mono text-xs font-semibold text-teal-600">
                    {marker.id}
                  </p>
                  <p className="whitespace-nowrap text-xs text-stone-500">
                    {marker.location}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-stone-200 bg-white" />
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-lg border border-stone-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-stone-600">OK</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="font-medium text-stone-600">Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="font-medium text-stone-600">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Feed */}
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Active Alerts</h3>
                <p className="text-sm text-stone-500">{mockAlerts.length} require attention</p>
              </div>
            </div>
          </div>
          <ScrollArea className="h-80">
            <div className="space-y-2 p-4">
              {mockAlerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => onContainerSelect(alert.containerId)}
                  className="flex w-full items-start gap-3 rounded-lg border border-stone-100 bg-stone-50/50 p-3 text-left transition-all hover:border-stone-200 hover:bg-white hover:shadow-sm"
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      alert.severity === "critical"
                        ? "bg-red-100 text-red-600"
                        : alert.severity === "warning"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-teal-600">
                        {alert.containerId}
                      </span>
                      <StatusChip
                        status={alert.severity === "critical" ? "critical" : "warning"}
                      />
                    </div>
                    <p className="mb-1 line-clamp-2 text-xs text-stone-700">
                      {alert.message}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10">
              <Package className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900">Recent Container Activity</h3>
              <p className="text-sm text-stone-500">Overview of active shipments</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/containers")}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:border-teal-300 hover:text-teal-600"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                <th className="px-5 py-3">Container ID</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Temperature</th>
                <th className="px-5 py-3">Battery</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockContainers.map((container) => (
                <tr
                  key={container.id}
                  onClick={() => onContainerSelect(container.id)}
                  className="cursor-pointer transition-colors hover:bg-stone-50"
                >
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm font-semibold text-teal-600">
                      {container.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="font-normal">
                      {container.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="text-stone-900">{container.origin}</span>
                      <ArrowRight className="h-3 w-3 text-stone-400" />
                      <span className="text-stone-900">{container.destination}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-stone-400" />
                      <span className="text-stone-600">{container.currentLocation}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Thermometer
                        className={`h-3.5 w-3.5 ${
                          Math.abs(container.temperature - container.setPoint) > 2
                            ? "text-red-500"
                            : "text-stone-400"
                        }`}
                      />
                      <span
                        className={`font-mono text-sm ${
                          Math.abs(container.temperature - container.setPoint) > 2
                            ? "font-semibold text-red-600"
                            : "text-stone-700"
                        }`}
                      >
                        {container.temperature}°C
                      </span>
                      <span className="text-xs text-stone-400">
                        / {container.setPoint}°C
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Battery
                        className={`h-3.5 w-3.5 ${
                          container.battery < 30
                            ? "text-red-500"
                            : container.battery < 50
                              ? "text-amber-500"
                              : "text-stone-400"
                        }`}
                      />
                      <Progress
                        value={container.battery}
                        className="h-1.5 w-12"
                      />
                      <span
                        className={`font-mono text-xs ${
                          container.battery < 30
                            ? "font-semibold text-red-600"
                            : container.battery < 50
                              ? "text-amber-600"
                              : "text-stone-500"
                        }`}
                      >
                        {container.battery}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusChip status={container.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          onClick={() => navigate("/containers")}
          className="group flex items-center gap-4 rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 text-left transition-all hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 shadow-lg shadow-teal-500/20 transition-transform group-hover:scale-110">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-stone-900">Track Container</p>
            <p className="text-sm text-stone-500">View real-time status</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-teal-500 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => navigate("/reports")}
          className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 text-left transition-all hover:border-stone-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 transition-colors group-hover:bg-stone-200">
            <TrendingUp className="h-6 w-6 text-stone-600" />
          </div>
          <div>
            <p className="font-semibold text-stone-900">Generate Report</p>
            <p className="text-sm text-stone-500">Export compliance data</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => navigate("/shipments")}
          className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 text-left transition-all hover:border-stone-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 transition-colors group-hover:bg-stone-200">
            <Clock className="h-6 w-6 text-stone-600" />
          </div>
          <div>
            <p className="font-semibold text-stone-900">Schedule Shipment</p>
            <p className="text-sm text-stone-500">Book a new shipment</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
