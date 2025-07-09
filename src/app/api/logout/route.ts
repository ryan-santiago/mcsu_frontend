import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json(
		{ message: 'Logged out' },
		{
			status: 200,
			headers: {
				'Set-Cookie': 'session=; Max-Age=0; Path=/; HttpOnly',
			},
		}
	)
}
