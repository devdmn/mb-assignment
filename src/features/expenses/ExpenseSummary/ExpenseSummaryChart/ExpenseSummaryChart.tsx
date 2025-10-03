import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styles from "./ExpenseSummaryChart.module.css";
import { PIE_COLORS } from "../../../../app/constants";

type ChartDataItem = {
  name: string;
  value: number;
};

type CustomLegendProps = {
  payload?: readonly {
    value?: string;
    color?: string;
    [key: string]: unknown;
  }[];
  hiddenCategories: Set<string>;
  onLegendClick: (dataKey: string) => void;
};

type TooltipPayloadItem = {
  name?: string;
  value?: number;
  payload?: ChartDataItem;
  [key: string]: unknown;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  total: number;
};

type ExpenseSummaryChartProps = {
  data: ChartDataItem[];
};

// Custom tooltip component - extracted outside
const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const chartData = payload[0].payload;
    if (!chartData) return null;

    const percent = ((chartData.value / total) * 100).toFixed(1);

    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{chartData.name}</p>
        <p className={styles.tooltipValue}>
          ₹{chartData.value} ({percent}%)
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component - extracted outside
const CustomLegend = ({
  payload,
  hiddenCategories,
  onLegendClick,
}: CustomLegendProps) => {
  if (!payload) return null;

  return (
    <ul className={styles.legendList}>
      {payload.map((entry, index) => {
        const categoryName = entry.value || "";
        const isHidden = hiddenCategories.has(categoryName);
        return (
          <li
            key={`legend-${index}`}
            onClick={() => onLegendClick(categoryName)}
            className={`${styles.legendItem} ${
              isHidden ? styles.legendItemHidden : ""
            }`}
          >
            <span
              className={styles.legendDot}
              style={{ background: entry.color || "#ccc" }}
            />
            <span>{categoryName}</span>
          </li>
        );
      })}
    </ul>
  );
};

const ExpenseSummaryChart: React.FC<ExpenseSummaryChartProps> = ({ data }) => {
  // State to track hidden categories
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(
    new Set()
  );

  // Filter data based on hidden categories
  const visibleData = data.filter((item) => !hiddenCategories.has(item.name));

  // Calculate total for percentage (only from visible data)
  const total = visibleData.reduce((sum, item) => sum + item.value, 0);

  // Toggle category visibility
  const handleLegendClick = (dataKey: string) => {
    setHiddenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dataKey)) {
        newSet.delete(dataKey);
      } else {
        newSet.add(dataKey);
      }
      return newSet;
    });
  };

  // Custom label to show percentage inside pie with white color
  const renderLabel = (entry: {
    cx?: string | number;
    cy?: string | number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    value?: number;
    percent?: number;
    [key: string]: unknown;
  }) => {
    if (!entry.value) return "";
    const percent = ((entry.value / total) * 100).toFixed(1);

    // Don't show label if slice is too small (less than 5%)
    if (parseFloat(percent) < 5) return "";

    // Calculate position inside the pie slice
    const RADIAN = Math.PI / 180;
    const cx =
      typeof entry.cx === "number"
        ? entry.cx
        : parseFloat(String(entry.cx || 0));
    const cy =
      typeof entry.cy === "number"
        ? entry.cy
        : parseFloat(String(entry.cy || 0));
    const radius =
      (entry.innerRadius || 0) +
      ((entry.outerRadius || 0) - (entry.innerRadius || 0)) * 0.5;
    const x = cx + radius * Math.cos(-(entry.midAngle || 0) * RADIAN);
    const y = cy + radius * Math.sin(-(entry.midAngle || 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "14px", fontWeight: "bold", pointerEvents: "none" }}
      >
        {`${percent}%`}
      </text>
    );
  };

  // Create custom legend payload from original data (not filtered)
  const customLegendPayload = data.map((item, index) => ({
    value: item.name,
    color: PIE_COLORS[index % PIE_COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={visibleData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={renderLabel}
          labelLine={false}
          animationDuration={300}
          animationBegin={0}
        >
          {visibleData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                PIE_COLORS[
                  data.findIndex((d) => d.name === entry.name) %
                    PIE_COLORS.length
                ]
              }
            />
          ))}
        </Pie>
        <Tooltip
          content={(props) => <CustomTooltip {...props} total={total} />}
        />
        <Legend
          content={() => (
            <CustomLegend
              payload={customLegendPayload}
              hiddenCategories={hiddenCategories}
              onLegendClick={handleLegendClick}
            />
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseSummaryChart;
