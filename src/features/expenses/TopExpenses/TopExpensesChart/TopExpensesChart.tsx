import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { BAR_COLOR } from "../../../../app/constants";
import styles from "./TopExpensesChart.module.css";

type TooltipPayloadItem = {
  value?: number;
  payload?: {
    category: string;
    value: number;
  };
  [key: string]: unknown;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

type ChartDataItem = {
  name: string;
  value: number;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data) return null;

    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipValue}>₹{data.value}</p>
      </div>
    );
  }
  return null;
};

const TopExpensesChart = ({ data }: { data: ChartDataItem[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#666", fontSize: 14 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          dataKey="value"
          fill={BAR_COLOR}
          radius={[0, 100, 100, 0]}
          barSize={40}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopExpensesChart;
