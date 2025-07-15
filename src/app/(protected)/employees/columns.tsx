'use client'

import { ColumnDef } from '@tanstack/react-table'
import { EmployeeDeployment } from '@/types/auth'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

export const employeeColumns: ColumnDef<EmployeeDeployment>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				checked={row.getIsSelected()}
			/>
		),
	},
	{ accessorKey: 'id', header: 'ID' },
	{ accessorKey: 'firstName', header: 'First Name' },
	{ accessorKey: 'middleName', header: 'Middle Name' },
	{ accessorKey: 'lastName', header: 'Last Name' },
	{
		accessorKey: 'fullName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Full Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'emailAddress',
		header: 'Email',
	},
	{
		accessorKey: 'mobileNumber',
		header: 'Mobile',
	},
	{
		accessorKey: 'employmentTeam',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Team
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'employmentType',
		header: 'Type',
	},
	{
		accessorKey: 'employmentRole',
		header: 'Role',
	},
	{
		accessorKey: 'deploymentClientName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Client
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'deploymentProjectName',
		header: 'Project',
	},
	{
		accessorKey: 'deploymentProjectCode',
		header: 'S3P Number',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const rowData = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(rowData.id)}
						>
							Copy Employee ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View Employee</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
