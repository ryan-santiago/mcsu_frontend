'use client'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LayoutGrid, Table } from 'lucide-react'

interface ViewToggleProps {
	view: 'table' | 'card'
	onChange: (view: 'table' | 'card') => void
}

export const DataViewToggle = ({ view, onChange }: ViewToggleProps) => {
	return (
		<ToggleGroup
			type="single"
			value={view}
			onValueChange={(val) => onChange(val as 'table' | 'card')}
		>
			<ToggleGroupItem value="table" aria-label="Table view">
				<Table className="h-4 w-4 mr-2" /> Table
			</ToggleGroupItem>
			<ToggleGroupItem value="card" aria-label="Card view">
				<LayoutGrid className="h-4 w-4 mr-2" /> Card
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
