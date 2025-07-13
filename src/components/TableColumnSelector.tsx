'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { EyeOff } from 'lucide-react'
import { VisibilityState } from '@tanstack/react-table'
import { ColumnDef } from '@tanstack/react-table'

interface ColumnSelectorProps<TData> {
	columnVisibility: VisibilityState
	setColumnVisibility: (state: VisibilityState) => void
	columns: ColumnDef<TData, any>[]
}

function getColumnId<TData>(col: ColumnDef<TData, any>): string {
	if ('id' in col && col.id) return col.id
	if ('accessorKey' in col && typeof col.accessorKey === 'string')
		return col.accessorKey
	return ''
}

export function ColumnSelector<TData>({
	columnVisibility,
	setColumnVisibility,
	columns,
}: ColumnSelectorProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<EyeOff className="w-4 h-4" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{columns
					.filter((col) => col.id !== 'select' && col.id !== 'actions')
					.map((column) => {
						const id = getColumnId(column)
						const header = column.header
						const label =
							typeof header === 'function'
								? id.charAt(0).toUpperCase() + id.slice(1)
								: String(header)

						return (
							<DropdownMenuCheckboxItem
								key={id}
								checked={columnVisibility[id] !== false}
								onCheckedChange={(checked) => {
									setColumnVisibility({
										...columnVisibility,
										[id]: checked,
									})
								}}
							>
								{label}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
