// app/api/login/route.ts (or /pages/api/login.ts for pages router)
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const body = await req.json()
	const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	const data = await res.json()

	if (!res.ok) {
		return NextResponse.json({ message: data.message }, { status: 401 })
	}

	// Set the session cookie server-side (more secure)
	const response = NextResponse.json(data)
	response.cookies.set('session', data.token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 7 days
	})
	return response
}
