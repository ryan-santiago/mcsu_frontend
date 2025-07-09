'use client'
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { SidebarTrigger, useSidebar } from './ui/sidebar'

const Navbar = () => {
	const { theme, setTheme } = useTheme()
	const { toggleSidebar } = useSidebar()

	const handleLogout = async () => {
		await fetch('/api/logout')
		window.location.href = '/login'
	}

	return (
		<nav className="flex p-4 items-center justify-between sticky top-0 bg-background z-10">
			{/* LEFT */}
			<SidebarTrigger />
			{/* <Button variant="outline" onClick={toggleSidebar}>
				Custom Button
			</Button> */}

			{/* RIGHT */}
			<div className="flex items-center gap-4">
				<Link href="/">Dashboard</Link>
				{/* Theme Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme('light')}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* User Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src="https://avatars.githubusercontent.com/u/122551395" />
							<AvatarFallback>RS</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="h-[1.2rem] w-[1.2rem] mr-2" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive" onClick={handleLogout}>
							<LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}

export default Navbar
