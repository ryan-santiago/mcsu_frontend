import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/lib/axiosBaseQuery'
import type { LoginRequest, LoginResponse, User } from '@/types/auth'

export const api = createApi({
	baseQuery: axiosBaseQuery(),
	reducerPath: 'api',
	tagTypes: ['Auth', 'Users'],
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
	}),
})

export const { useLoginMutation, useGetUsersQuery } = api
