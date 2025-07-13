import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Payment } from './columns'
import { Badge } from '@/components/ui/badge'

interface PaymentCardProps {
	payment: Payment
}

export const PaymentCard = ({ payment }: PaymentCardProps) => {
	const statusColor = {
		pending: 'bg-yellow-500/20 text-yellow-800',
		success: 'bg-green-500/20 text-green-800',
		failed: 'bg-red-500/20 text-red-800',
		processing: 'bg-blue-500/20 text-blue-800',
	}[payment.status]

	return (
		<div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 bg-white dark:bg-muted">
			<CardHeader className="border-b py-4 px-6">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium truncate">
						{payment.username}
					</CardTitle>
					<Badge className={`text-xs px-2 py-1 rounded ${statusColor}`}>
						{payment.status}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="py-4 px-6 text-sm space-y-2">
				<p className="truncate">
					<span className="text-muted-foreground font-medium">Email:</span>{' '}
					{payment.email}
				</p>
				<p>
					<span className="text-muted-foreground font-medium">Amount:</span>{' '}
					<span className="font-semibold text-foreground">
						₱{payment.amount.toLocaleString()}
					</span>
				</p>
			</CardContent>
		</div>
	)
}
