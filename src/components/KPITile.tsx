import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPITileProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "flat";
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "destructive" | "warning" | "success";
}

export function KPITile({
  title,
  value,
  trend,
  icon: Icon,
  subtitle,
  variant = "default",
}: KPITileProps) {
  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trend) {
      case "up":
        return (
          <TrendingUp
            className={cn(
              "h-3.5 w-3.5",
              variant === "destructive" || variant === "warning"
                ? "text-red-500"
                : "text-emerald-500"
            )}
          />
        );
      case "down":
        return (
          <TrendingDown
            className={cn(
              "h-3.5 w-3.5",
              variant === "success" ? "text-emerald-500" : "text-stone-400"
            )}
          />
        );
      case "flat":
        return <Minus className="h-3.5 w-3.5 text-stone-400" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return {
          card: "border-red-200/50 bg-gradient-to-br from-white to-red-50/30",
          icon: "bg-red-500/10 text-red-500 ring-1 ring-red-500/20",
          value: "text-red-600",
          indicator: "bg-red-500",
        };
      case "warning":
        return {
          card: "border-amber-200/50 bg-gradient-to-br from-white to-amber-50/30",
          icon: "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
          value: "text-amber-600",
          indicator: "bg-amber-500",
        };
      case "success":
        return {
          card: "border-emerald-200/50 bg-gradient-to-br from-white to-emerald-50/30",
          icon: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
          value: "text-emerald-600",
          indicator: "bg-emerald-500",
        };
      default:
        return {
          card: "border-stone-200/60 bg-white",
          icon: "bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/20",
          value: "text-stone-900",
          indicator: "bg-teal-500",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md",
        styles.card
      )}
    >
      {/* Subtle top indicator */}
      <div
        className={cn(
          "absolute left-0 top-0 h-1 w-full opacity-80",
          styles.indicator
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {title}
          </p>
          <p
            className={cn(
              "font-mono text-2xl font-bold tracking-tight",
              styles.value
            )}
          >
            {value}
          </p>
          {subtitle && (
            <div className="flex items-center gap-1.5 pt-1">
              {getTrendIcon()}
              <p className="text-xs text-stone-500">{subtitle}</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
            styles.icon
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
