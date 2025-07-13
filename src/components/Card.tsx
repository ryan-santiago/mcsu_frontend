'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

interface GenericCardListProps<TData> {
	data: TData[]
	renderCard: (item: TData) => ReactNode
}

export function GenericCardList<TData>({
	data,
	renderCard,
}: GenericCardListProps<TData>) {
	if (!data.length)
		return (
			<p className="text-center text-muted-foreground py-10">No results.</p>
		)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.map((item, index) => (
				<Card key={index} className="shadow">
					{renderCard(item)}
				</Card>
			))}
		</div>
	)
}
