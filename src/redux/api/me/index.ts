import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<ME.GetMeResponse, ME.GetMeRequest>({
			query: () => ({
				url: '/auth/user',
				method: 'GET'
			}),
			providesTags: ['me']
		})
	})
});
export const { useGetMeQuery } = api;
