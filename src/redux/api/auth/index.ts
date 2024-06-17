import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
			query: () => ({
				url: '/auth/user',
				method: 'GET'
			}),
			providesTags: ['auth']
		}),
		postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
			query: (loginData) => ({
				url: '/auth/sign-in',
				method: 'POST',
				body: loginData
			}),
			invalidatesTags: ['auth']
		}),
		postRegistration: build.mutation<
			AUTH.PostRegistrationResponse,
			AUTH.PostRegistrationRequest
		>({
			query: (registrationData) => ({
				url: '/auth/sign-up',
				method: 'POST',
				body: registrationData
			}),
			invalidatesTags: ['auth']
		})
	})
});
export const {
	useGetMeQuery,
	usePostLoginMutation,
	usePostRegistrationMutation
} = api;
