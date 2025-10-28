"use client";
import {
	Bar,
	BarChart,
	Scatter,
	ScatterChart,
	Line,
	LineChart,
	Pie,
	PieChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Cell
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
						{chartData.datakeys.yKey.map((yKey, i) => (
							<Bar dataKey={yKey} key={`barChart-${id}-${i}`} fill={getRandomColor()} />
						))}
					</BarChart>
				</ResponsiveContainer>
			) : chartType === "scatter" ? (
				<ResponsiveContainer width="100%" minHeight={300}>
					<ScatterChart data={chartData.data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={chartData.datakeys.xKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						{chartData.datakeys.yKey.map((yKey, i) => (
							<Scatter
								key={`scatterChart-${id}-${i}`}
								name={yKey.toString()}
								dataKey={yKey}
								fill={getRandomColor()}
							/>
						))}
					</ScatterChart>
				</ResponsiveContainer>
			) : chartType === "line" ? (
				<ResponsiveContainer width="100%" minHeight={350}>
					<LineChart data={chartData.data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={chartData.datakeys.xKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						{chartData.datakeys.yKey.map((yKey, i) => (
							<Line
								type="monotone"
								dataKey={yKey}
								key={`lineChart-${id}-${i}`}
								stroke={getRandomColor()}
								activeDot={{ r: 8 }}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			) : chartType === "pie" ? (
				<ResponsiveContainer width="100%" minHeight={400}>
					<PieChart>
						<Tooltip />
						<Legend />
						{chartData.datakeys.yKey.map((yKey, i) => (
							<Pie
								data={chartData.data}
								dataKey={yKey}
								nameKey={chartData.datakeys.xKey}
								cx="50%"
								cy="50%"
								outerRadius={120 + i * 40} 
								fill={getRandomColor()}
								key={`pieChart-${id}-${i}`}
								label
							>
								{chartData.data.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={`rgb(${Math.floor(Math.random() * 160)}, ${Math.floor(Math.random() * 160)}, ${Math.floor(Math.random() * 160)})`}
									/>
								))}
							</Pie>
						))}
					</PieChart>
				</ResponsiveContainer>
			) : (
				<div>chart type not found</div>
			)}
		</>
	);
}
