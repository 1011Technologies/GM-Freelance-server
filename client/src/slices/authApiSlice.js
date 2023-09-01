import { apiSlice } from './apiSlice';

const AUTH_URL = '/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-up`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/log-in`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApiSlice;