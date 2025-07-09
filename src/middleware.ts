import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isTokenExpired(token: string): boolean {
	try {
		const payload = JSON.parse(
			Buffer.from(token.split('.')[1], 'base64').toString('utf8')
		)
		const now = Math.floor(Date.now() / 1000)
		return payload.exp && payload.exp < now
	} catch (err) {
		// If decoding fails, treat as invalid token
		return true
	}
}

export function middleware(request: NextRequest) {
	const session = request.cookies.get('session')?.value

	const isLoggedIn = !!session
	const isLoginPage = request.nextUrl.pathname === '/login'

	// Validate token expiration if logged in
	if (isLoggedIn && isTokenExpired(session!)) {
		const response = NextResponse.redirect(new URL('/login', request.url))
		response.cookies.delete('session') // clear expired cookie
		return response
	}

	if (!isLoggedIn && !isLoginPage) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isLoggedIn && isLoginPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|register).*)'], // protect all routes except static/api
}
