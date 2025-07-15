// lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

export const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string
			method: AxiosRequestConfig['method']
			data?: AxiosRequestConfig['data']
			params?: AxiosRequestConfig['params']
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params }) => {
		try {
			// ✅ Check for window object to avoid SSR/localStorage issues
			let token: string | null = null

			if (typeof window !== 'undefined') {
				const persisted = localStorage.getItem('persist:root')
				if (persisted) {
					const parsed = JSON.parse(persisted)
					const auth = parsed?.auth ? JSON.parse(parsed.auth) : null
					token = auth?.token
				}
			}

			const headers: AxiosRequestConfig['headers'] = {}
			if (token) {
				headers.Authorization = `Bearer ${token}`
			}

			const result = await axios({
				url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
				method,
				data,
				params,
				headers,
			})

			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status || 500,
					data: err.response?.data || err.message,
				},
			}
		}
	}
