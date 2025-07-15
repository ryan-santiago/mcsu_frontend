import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import storage from './storage'
import authReducer from './authSlice'
import { api } from '@/services/api'

// Combine reducers
const rootReducer = combineReducers({
	auth: authReducer,
	[api.reducerPath]: api.reducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'], // only persist auth slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
