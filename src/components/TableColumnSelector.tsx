'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { EyeOff } from 'lucide-react'
import { Table as ReactTable } from '@tanstack/react-table'

interface ColumnSelectorProps<TData> {
	table: ReactTable<TData>
}

export function ColumnSelector<TData>({ table }: ColumnSelectorProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<EyeOff className="w-4 h-4" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{table
					.getAllColumns()
					.filter(
						(col) =>
							col.getCanHide() && col.id !== 'select' && col.id !== 'actions'
					)
					.map((column) => {
						const header = column.columnDef.header
						const label =
							typeof header === 'function'
								? column.id.charAt(0).toUpperCase() + column.id.slice(1)
								: String(header)

						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{label}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
