import axios from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

export const axiosBaseQuery =
	(): BaseQueryFn<{ url: string; method: string; data?: any; params?: any }> =>
	async ({ url, method, data, params }) => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null

			const result = await axios({
				baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
				url,
				method,
				data,
				params,
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			})

			return { data: result.data }
		} catch (error: any) {
			return {
				error: {
					status: error.response?.status,
					data: error.response?.data || error.message,
				},
			}
		}
	}
