import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status:
    | "ok"
    | "warning"
    | "critical"
    | "success"
    | "error"
    | "neutral"
    | "paid"
    | "overdue"
    | "pending"
    | "active"
    | "inactive"
    | "connected"
    | "disconnected";
  label?: string;
}

export function StatusChip({ status, label }: StatusChipProps) {
  const getStyles = () => {
    switch (status) {
      case "ok":
      case "success":
      case "paid":
      case "active":
      case "connected":
        return "border-green-200 bg-green-50 text-green-700 hover:bg-green-100";
      case "warning":
      case "pending":
        return "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100";
      case "critical":
      case "error":
      case "overdue":
      case "disconnected":
        return "border-red-200 bg-red-50 text-red-700 hover:bg-red-100";
      case "neutral":
      case "inactive":
        return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
    }
  };

  const getLabel = () => {
    if (label) return label;
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge variant="outline" className={cn("rounded-full", getStyles())}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {getLabel()}
    </Badge>
  );
}
