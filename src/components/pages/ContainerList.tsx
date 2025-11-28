import { useState } from "react";
import { Search, Filter, ArrowRight, MapPin } from "lucide-react";
import { StatusChip } from "@/components/StatusChip";
import { mockContainers, Container } from "@/lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ContainerListProps {
  onContainerSelect: (containerId: string) => void;
}

export function ContainerList({ onContainerSelect }: ContainerListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredContainers = mockContainers.filter((container) => {
    const matchesSearch =
      container.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.awb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || container.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (container: Container) => {
    onContainerSelect(container.id);
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Search Containers</CardTitle>
          <CardDescription>
            Find containers by ID, AWB, origin, or destination
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by Container ID, AWB, Origin, or Destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ok">OK</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">More Filters</Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredContainers.length} containers found
            </span>
            <div className="flex items-center gap-2">
              <StatusChip
                status="ok"
                label={`${mockContainers.filter((c) => c.status === "ok").length} OK`}
              />
              <StatusChip
                status="warning"
                label={`${mockContainers.filter((c) => c.status === "warning").length} Warning`}
              />
              <StatusChip
                status="critical"
                label={`${mockContainers.filter((c) => c.status === "critical").length} Critical`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Container ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContainers.map((container) => (
                <TableRow
                  key={container.id}
                  onClick={() => handleRowClick(container)}
                  className="cursor-pointer"
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
                    <div className="flex items-center gap-1">
                      <span>{container.origin}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span>{container.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {container.currentLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {new Date(container.lastSeen).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        Math.abs(container.temperature - container.setPoint) > 2
                          ? "font-medium text-destructive"
                          : ""
                      }
                    >
                      {container.temperature}°C
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      / {container.setPoint}°C
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={container.battery} className="h-2 w-16" />
                      <span
                        className={`text-xs ${
                          container.battery < 30
                            ? "text-destructive"
                            : container.battery < 50
                              ? "text-orange-500"
                              : "text-muted-foreground"
                        }`}
                      >
                        {container.battery}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={container.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredContainers.length === 0 && searchTerm && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">
              No containers found matching "{searchTerm}"
            </p>
            <Button variant="link" onClick={() => setSearchTerm("")}>
              Clear search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
