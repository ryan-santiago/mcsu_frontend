import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { EmployeeDeployment } from '@/types/auth'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone } from 'lucide-react'

interface EmployeeCardProps {
	employee: EmployeeDeployment
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
	return (
		<Card className="px-2 py-3 rounded-xl shadow hover:shadow-lg transition-all duration-500 border-muted">
			<CardHeader className="bg-muted/30">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-lg font-semibold">
							{employee.fullName}
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							{employee.employmentRole} – {employee.employmentTeam}
						</p>
					</div>

					<Badge
						variant="secondary"
						className="text-xs text-muted-foreground border bg-white p-1"
					>
						{employee.employmentType}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="text-sm space-y-3">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Mail size={14} />
					<span>{employee.emailAddress}</span>
				</div>
				<div className="flex items-center gap-2 text-muted-foreground">
					<Phone size={14} />
					<span>{employee.mobileNumber}</span>
				</div>

				<hr className="border-muted/30 my-2" />

				<div className="space-y-1 text-muted-foreground">
					<p>
						<span className="font-medium text-foreground">Client:</span>{' '}
						{employee.deploymentClientName || '—'}
					</p>
					<p>
						<span className="font-medium text-foreground">Project:</span>{' '}
						{employee.deploymentProjectName || '—'}
					</p>
					<p>
						<span className="font-medium text-foreground">Type:</span>{' '}
						{employee.deploymentProjectType || '—'}
					</p>
					<p>
						<span className="font-medium text-foreground">S3P #:</span>{' '}
						{employee.deploymentProjectCode || '—'}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
