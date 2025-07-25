'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
	const router = useRouter()

	useEffect(() => {
		// Redirect to homepage after mount
		router.replace('/')
	}, [router])

	return null // Optionally show a spinner or "Redirecting..."
}
