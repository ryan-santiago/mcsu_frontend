'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert("Passwords don't match")
			return
		}
		console.log({ email, password })
		// TODO: Handle actual registration
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg">
				<div className="text-center space-y-1">
					<h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
					<p className="text-muted-foreground text-sm">
						Join MCSU system today
					</p>
				</div>

				<form onSubmit={handleRegister} className="space-y-4">
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

					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirm Password</Label>
						<div className="relative">
							<Input
								id="confirm-password"
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="••••••••"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								className="pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
								tabIndex={-1}
							>
								{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<Button type="submit" className="w-full">
						Register
					</Button>
				</form>

				<div className="text-sm text-muted-foreground text-center">
					Already have an account?{' '}
					<Link href="/login" className="text-primary hover:underline">
						Sign In
					</Link>
				</div>

				<p className="text-center text-xs text-muted-foreground mt-4">
					© MCSU 2025
				</p>
			</div>
		</div>
	)
}
