import CardList from '@/components/CardList'
import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Progress } from '@/components/ui/progress'
import { BadgeCheck, Candy, Citrus, Shield } from 'lucide-react'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import EditUser from '@/components/EditUser'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AppLineChart from '@/components/AppLineChart'

const SingleUserPage = () => {
	return (
		<div className="space-y-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/users">Users</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>John Doe</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex flex-col xl:flex-row gap-6">
				{/* LEFT */}
				<div className="w-full xl:w-1/3 space-y-6">
					{/* User Badges */}
					<div className="bg-card text-card-foreground p-4 rounded-lg shadow">
						<h1 className="text-xl font-semibold">User Badges</h1>
						<div className="flex gap-4 mt-4">
							{[
								{
									icon: (
										<BadgeCheck
											size={36}
											className="p-2 rounded-full bg-blue-500/30 border border-blue-500/50"
										/>
									),
									title: 'Verified User',
									description: 'This user has been verified by the admin.',
								},
								{
									icon: (
										<Shield
											size={36}
											className="p-2 rounded-full bg-green-500/30 border border-green-500/50"
										/>
									),
									title: 'Admin',
									description:
										'Admin users have access to all features and can manage users.',
								},
								{
									icon: (
										<Candy
											size={36}
											className="p-2 rounded-full bg-yellow-500/30 border border-yellow-500/50"
										/>
									),
									title: 'Awarded',
									description:
										'This user has been awarded for their contributions.',
								},
								{
									icon: (
										<Citrus
											size={36}
											className="p-2 rounded-full bg-orange-500/30 border border-orange-500/50"
										/>
									),
									title: 'Popular',
									description: 'This user has been popular in the community.',
								},
							].map((badge, i) => (
								<HoverCard key={i}>
									<HoverCardTrigger>{badge.icon}</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2">{badge.title}</h1>
										<p className="text-sm text-muted-foreground">
											{badge.description}
										</p>
									</HoverCardContent>
								</HoverCard>
							))}
						</div>
					</div>

					{/* User Info */}
					<div className="bg-card text-card-foreground p-4 rounded-lg shadow">
						<div className="flex items-center justify-between">
							<h1 className="text-xl font-semibold">User Information</h1>
							<Sheet>
								<SheetTrigger asChild>
									<Button size="sm">Edit User</Button>
								</SheetTrigger>
								<EditUser />
							</Sheet>
						</div>

						<div className="space-y-4 mt-4">
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">
									Profile Completion
								</p>
								<Progress value={66} />
							</div>

							{[
								{ label: 'Username', value: 'john.doe' },
								{ label: 'Email', value: 'john.doe@gmail.com' },
								{ label: 'Location', value: 'New York, NY' },
							].map((item, i) => (
								<div className="flex items-center gap-2" key={i}>
									<span className="font-semibold">{item.label}:</span>
									<span>{item.value}</span>
								</div>
							))}

							<div className="flex items-center gap-2">
								<span className="font-semibold">Role:</span>
								<Badge>Admin</Badge>
							</div>
						</div>

						<p className="text-sm text-muted-foreground mt-4">
							Joined on 2025.01.01
						</p>
					</div>

					{/* Card List */}
					<div className="bg-card text-card-foreground p-4 rounded-lg shadow">
						<CardList title="Recent Transactions" />
					</div>
				</div>

				{/* RIGHT */}
				<div className="w-full xl:w-2/3 space-y-6">
					{/* User Bio */}
					<div className="bg-card text-card-foreground p-4 rounded-lg shadow space-y-2">
						<div className="flex items-center gap-4">
							<Avatar className="size-12">
								<AvatarImage src="https://avatars.githubusercontent.com/u/122551395" />
								<AvatarFallback>RS</AvatarFallback>
							</Avatar>
							<h1 className="text-xl font-semibold">John Doe</h1>
						</div>
						<p className="text-sm text-muted-foreground">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum rem
							eligendi omnis iusto veniam ut ullam! Earum voluptas reprehenderit
							eveniet ipsa dolores assumenda error tenetur quaerat voluptatibus
							ea. Molestias, assumenda!
						</p>
					</div>

					{/* Chart */}
					<div className="bg-card text-card-foreground p-4 rounded-lg shadow">
						<h1 className="text-xl font-semibold mb-4">User Activity</h1>
						<AppLineChart />
					</div>
				</div>
			</div>
		</div>
	)
}
export default SingleUserPage
