"use client";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { ChartProps } from "@/lib/types";

const chartColors = [
	"#4F46E5", // Indigo Dark
	"#059669", // Emerald Dark
	"#BE123C", // Rose Dark
	"#B45309", // Amber Dark
	"#0284C7", // Sky Blue Dark
	"#7C3AED", // Violet Dark
];

export default function Charts({ id, chartType, chartData }: ChartProps) {
	const getRandomColor = () =>
		chartColors[Math.floor(Math.random() * chartColors.length)];

	return (
		<>
			{chartType === "bar" ? (
				<ResponsiveContainer width="100%" minHeight={300}>
					<BarChart data={chartData.data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={chartData.datakeys.xKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						{chartData.datakeys.barKey.map((barKey,i) => (
							<Bar dataKey={barKey} key={`barChart-${id}-${i}`} fill={getRandomColor()} />
						))}
					</BarChart>
				</ResponsiveContainer>
			) : chartType === "line" ? (
				<div>Line</div>
			) : chartType === "scatter" ? (
				<div>scatter</div>
			) : chartType === "pie" ? (
				<div>pie</div>
			) : (
				<div>chart type not found</div>
			)}
		</>
	);
}
