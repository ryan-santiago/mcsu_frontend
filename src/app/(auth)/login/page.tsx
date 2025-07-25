'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/services/api'
import { useAppDispatch } from '@/lib/hooks'
import { setCredentials } from '@/lib/authSlice'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [login, { isLoading, error }] = useLoginMutation()
	const router = useRouter()
	const dispatch = useAppDispatch()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await login({ email, password }).unwrap()
			document.cookie = `session=${res.token}; path=/; max-age=86400`

			dispatch(
				setCredentials({
					user: res.data,
					token: res.token,
				})
			)

			router.push('/')
		} catch (err) {
			console.error('Login failed:', err)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg">
				<div className="text-center space-y-1">
					<h1 className="text-2xl font-bold tracking-tight">Login to MCSU</h1>
					<p className="text-muted-foreground text-sm">
						Enter your credentials below
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						Login
					</Button>
				</form>

				<div className="flex justify-between text-sm text-muted-foreground">
					<Link href="/forgot-password" className="hover:underline">
						Forgot Password
					</Link>
					<Link href="/signup" className="hover:underline">
						Sign Up
					</Link>
				</div>

				<p className="text-center text-xs text-muted-foreground mt-4">
					© MCSU 2025
				</p>
			</div>
		</div>
	)
}
