import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/lib/axiosBaseQuery'
import type {
	LoginRequest,
	LoginResponse,
	User,
	EmployeeDeployment,
} from '@/types/auth'

export const api = createApi({
	baseQuery: axiosBaseQuery(),
	reducerPath: 'api',
	tagTypes: ['Auth', 'Users', 'Employees'],
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				data: credentials,
			}),
		}),
		getUsers: build.query<User[], void>({
			query: () => ({
				url: '/users',
				method: 'GET',
			}),
			providesTags: ['Users'],
		}),
		getEmployees: build.query<EmployeeDeployment[], void>({
			query: () => ({
				url: '/employees/datalist',
				method: 'GET',
			}),
			transformResponse: (response: {
				success: boolean
				message: string
				data: EmployeeDeployment[]
			}) => {
				return response.data
			},
			providesTags: ['Employees'],
		}),
	}),
})

export const { useLoginMutation, useGetUsersQuery, useGetEmployeesQuery } = api
