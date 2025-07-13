import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('session')?.value
	const isLoginPage = request.nextUrl.pathname === '/login'

	let isValidToken = false

	if (token) {
		try {
			const decoded: any = jwt.decode(token)
			const now = Math.floor(Date.now() / 1000)
			if (decoded && decoded.exp > now) {
				isValidToken = true
			}
		} catch (e) {
			// Invalid token, treat as logged out
		}
	}

	// redirect to login if not authenticated and not on login page
	if (!isValidToken && !isLoginPage) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	// redirect to homepage if already logged in and trying to visit login page
	if (isValidToken && isLoginPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
