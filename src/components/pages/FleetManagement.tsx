import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Activity, MapPin, BarChart3 } from "lucide-react";
import { mockContainers } from "@/lib/mockData";
import { StatusChip } from "@/components/StatusChip";
import { KPITile } from "@/components/KPITile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FleetManagement() {
  const navigate = useNavigate();
  const [maintenanceFilter, setMaintenanceFilter] = useState<
    "all" | "due" | "overdue"
  >("all");

  const totalFleet = 45;
  const activeRentals = mockContainers.length;
  const inMaintenance = 3;
  const available = totalFleet - activeRentals - inMaintenance;

  const utilizationRate = ((activeRentals / totalFleet) * 100).toFixed(1);

  const handleContainerClick = (containerId: string) => {
    navigate(`/containers/${containerId}`);
  };

  return (
    <div className="space-y-6">
      {/* Fleet KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPITile
          title="Total Fleet"
          value={totalFleet}
          icon={Activity}
          subtitle="Opticooler units"
        />
        <KPITile
          title="Active Rentals"
          value={activeRentals}
          icon={MapPin}
          trend="up"
          subtitle={`${utilizationRate}% utilization`}
        />
        <KPITile
          title="Available"
          value={available}
          icon={BarChart3}
          subtitle="Ready to deploy"
        />
        <KPITile
          title="In Maintenance"
          value={inMaintenance}
          icon={Wrench}
          subtitle="Service in progress"
        />
      </div>

      {/* Fleet Distribution Map */}
      <Card>
        <CardHeader>
          <CardTitle>Global Fleet Distribution</CardTitle>
          <CardDescription>
            OptiCooler units distributed across regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { region: "Europe", units: 18, active: 12, available: 6 },
              { region: "Asia-Pacific", units: 15, active: 10, available: 5 },
              { region: "Americas", units: 12, active: 8, available: 4 },
            ].map((item) => (
              <div
                key={item.region}
                className="rounded-lg border bg-primary/5 p-4"
              >
                <p className="text-sm text-muted-foreground">{item.region}</p>
                <p className="text-2xl font-bold">{item.units} units</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <span className="text-green-600">{item.active} Active</span>
                  <span className="text-muted-foreground">
                    {item.available} Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>
              Upcoming and overdue maintenance tasks
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {(["all", "due", "overdue"] as const).map((filter) => (
              <Button
                key={filter}
                variant={maintenanceFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setMaintenanceFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Container ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Days Until</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContainers.map((container) => {
                const daysUntil = Math.floor(
                  (new Date(container.nextMaintenance).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <TableRow
                    key={container.id}
                    className="cursor-pointer"
                    onClick={() => handleContainerClick(container.id)}
                  >
                    <TableCell>
                      <span className="font-mono font-medium text-primary">
                        {container.id}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{container.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={container.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(container.nextMaintenance).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          daysUntil < 7
                            ? "font-medium text-destructive"
                            : daysUntil < 30
                              ? "font-medium text-orange-500"
                              : ""
                        }
                      >
                        {daysUntil} days
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Create maintenance ticket for ${container.id}`);
                        }}
                      >
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sensor Health */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Sensor Health Analytics</CardTitle>
            <CardDescription>
              Powered by Databricks • Last updated:{" "}
              {new Date().toLocaleString()}
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />
            Connected
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium">Compressor Efficiency</h4>
                <StatusChip status="ok" label="Optimal" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average RPM</span>
                  <span className="font-medium">2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power Draw</span>
                  <span className="font-medium">145W</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium">Sensor Calibration</h4>
                <StatusChip status="warning" label="1 Overdue" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Calibration</span>
                  <span className="font-medium">15 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium">±0.2°C</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
