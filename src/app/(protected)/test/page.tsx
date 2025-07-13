'use client'

import { useState } from 'react'
import { Payment, columns } from './columns'
import { GenericDataTable } from '@/components/Table'
import { GenericCardList } from '@/components/Card'
import { DataViewToggle } from '@/components/DataViewToggle'
import { Input } from '@/components/ui/input'
import { PaymentCard } from './cards'
import { ColumnSelector } from '@/components/TableColumnSelector'
import { useReactTable } from '@tanstack/react-table'

const dummyData: Payment[] = [
	{
		id: '1',
		username: 'John Doe',
		email: 'john@example.com',
		amount: 1500,
		status: 'success',
	},
	{
		id: '2',
		username: 'Jane Smith',
		email: 'jane@example.com',
		amount: 2300,
		status: 'pending',
	},
	{
		id: '3',
		username: 'Ryan Santiago',
		email: 'ryan@example.com',
		amount: 3000,
		status: 'failed',
	},
]

export default function PaymentsPage() {
	const [view, setView] = useState<'table' | 'card'>('table')
	const [search, setSearch] = useState('')

	const [tableInstance, setTableInstance] =
		useState<ReturnType<typeof useReactTable<Payment>>>()

	const filteredData = dummyData.filter(
		(p) =>
			p.username.toLowerCase().includes(search.toLowerCase()) ||
			p.email.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between px-4 py-2 bg-secondary rounded-md">
				<h1 className="font-semibold">All Payments</h1>
				<DataViewToggle view={view} onChange={setView} />
			</div>

			<div className="px-4 flex items-center justify-between">
				<Input
					placeholder="Search by user or email"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-sm"
				/>

				{tableInstance && <ColumnSelector table={tableInstance} />}
			</div>

			<div className="px-4">
				{view === 'table' ? (
					<GenericDataTable
						columns={columns}
						data={filteredData}
						onTableReady={setTableInstance}
					/>
				) : (
					<GenericCardList
						data={filteredData}
						renderCard={(payment) => <PaymentCard payment={payment} />}
					/>
				)}
			</div>
		</div>
	)
}
