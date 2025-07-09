'use client'

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-4)',
	},
	dance: {
		label: 'Dance',
		color: 'var(--chart-3)',
	},
} satisfies ChartConfig

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80, dance: 50 },
	{ month: 'February', desktop: 305, mobile: 200, dance: 50 },
	{ month: 'March', desktop: 237, mobile: 120, dance: 50 },
	{ month: 'April', desktop: 73, mobile: 190, dance: 50 },
	{ month: 'May', desktop: 209, mobile: 130, dance: 50 },
	{ month: 'June', desktop: 214, mobile: 140, dance: 50 },
]

const AppBarChart = () => {
	return (
		<div className="">
			<h1 className=" text-lg font-medium mb-6">Total Revenue</h1>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<YAxis tickLine={false} tickMargin={10} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
					<Bar dataKey="dance" fill="var(--color-dance)" radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	)
}

export default AppBarChart
