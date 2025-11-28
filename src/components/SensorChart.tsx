import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TemperatureReading } from "@/lib/mockData";

interface SensorChartProps {
  data: TemperatureReading[];
  thresholds?: { min: number; max: number };
  timeRange?: "24h" | "48h" | "7d";
}

export function SensorChart({ data, thresholds }: SensorChartProps) {
  const formattedData = data.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }),
    internal: Number(reading.internal.toFixed(1)),
    setPoint: Number(reading.setPoint.toFixed(1)),
    ambient: Number(reading.ambient.toFixed(1)),
  }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="time"
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              padding: "12px",
            }}
            formatter={(value: number) => [`${value}°C`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} iconType="line" />

          {thresholds && (
            <>
              <ReferenceLine
                y={thresholds.max}
                stroke="hsl(var(--destructive))"
                strokeDasharray="5 5"
                label={{ value: "Max", position: "right", fontSize: 12 }}
              />
              <ReferenceLine
                y={thresholds.min}
                stroke="hsl(var(--destructive))"
                strokeDasharray="5 5"
                label={{ value: "Min", position: "right", fontSize: 12 }}
              />
            </>
          )}

          <Line
            type="monotone"
            dataKey="internal"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Internal Temp"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="setPoint"
            stroke="#22c55e"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Set Point"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ambient"
            stroke="#f97316"
            strokeWidth={1}
            name="Ambient Temp"
            dot={false}
            opacity={0.6}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
