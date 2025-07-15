'use client'

import { useState } from 'react'
import { GenericCardList } from '@/components/Card'
import { DataViewToggle } from '@/components/DataViewToggle'
import { GenericDataTable } from '@/components/Table'
import { ColumnSelector } from '@/components/TableColumnSelector'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { VisibilityState } from '@tanstack/react-table'
import { employeeColumns } from './columns'
import { EmployeeCard } from './cards'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useGetEmployeesQuery } from '@/services/api'
import { EmployeeDeployment } from '@/types/auth'

export default function EmployeesPage() {
	const [view, setView] = useState<'table' | 'card'>('table')
	const [search, setSearch] = useState('')
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		id: false,
		firstName: false,
		middleName: false,
		lastName: false,
		mobileNumber: false,
	})

	const { data, isLoading, error } = useGetEmployeesQuery()

	const filteredData: EmployeeDeployment[] = Array.isArray(data)
		? search.trim()
			? data.filter(
					(emp) =>
						emp.fullName?.toLowerCase().includes(search.toLowerCase()) ||
						emp.emailAddress?.toLowerCase().includes(search.toLowerCase()) ||
						emp.deploymentClientName
							?.toLowerCase()
							.includes(search.toLowerCase())
			  )
			: data
		: []

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/users">Employees</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<DataViewToggle view={view} onChange={setView} />
			</div>

			<div className="px-4 flex items-center justify-between">
				<div className="flex items-center justify-between space-x-5">
					<Input
						placeholder="Search ..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-md"
					/>
					{view === 'table' && (
						<ColumnSelector
							columnVisibility={columnVisibility}
							setColumnVisibility={setColumnVisibility}
							columns={employeeColumns}
						/>
					)}
				</div>
				{view === 'table' ? (
					<Button variant="ghost">
						Add New Employee
						<PlusCircle className="ml-2 h-4 w-4" />
					</Button>
				) : (
					<></>
				)}
			</div>

			{isLoading ? (
				<div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
					Loading...
				</div>
			) : error ? (
				<div className="h-40 flex items-center justify-center text-red-500 text-sm">
					Failed to load employees.
				</div>
			) : (
				<div className="px-4">
					{view === 'table' ? (
						<GenericDataTable
							columns={employeeColumns}
							data={filteredData}
							columnVisibility={columnVisibility}
							onColumnVisibilityChange={setColumnVisibility}
						/>
					) : (
						<GenericCardList
							data={filteredData}
							renderCard={(employee) => <EmployeeCard employee={employee} />}
						/>
					)}
				</div>
			)}
		</div>
	)
}
