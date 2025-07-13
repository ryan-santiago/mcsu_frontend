export interface LoginRequest {
	email: string
	password: string
}

export interface User {
	id: string
	employeeId: string
	email: string
	name: string
}

export interface LoginResponse {
	success: boolean
	message: string
	token: string
	data: User
}
