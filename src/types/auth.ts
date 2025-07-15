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

export interface EmployeeDeployment {
	id: string
	code: string
	fullName: string
	firstName: string
	middleName: string | null
	lastName: string
	suffix: string | null
	birthDate: string
	gender: string
	emailAddress: string
	mobileNumber: string
	viberNumber: string
	employmentType: string
	employmentTeam: string
	employmentRole: string
	employmentLevel: string
	employmentStartDate: string
	employmentEndDate: string | null
	deploymentStartDate: string
	deploymentEndDate: string
	deploymentProjectType: string
	deploymentProjectCode: string
	deploymentProjectName: string
	deploymentClientName: string
}
