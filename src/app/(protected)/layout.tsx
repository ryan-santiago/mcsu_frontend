import { cookies } from 'next/headers'
import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar />
				<main className="w-full">
					<Navbar />
					<div className="px-4">{children}</div>
				</main>
			</SidebarProvider>
		</ThemeProvider>
	)
}
