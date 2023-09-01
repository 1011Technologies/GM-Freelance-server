import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `${USERS_URL}/profile`,
            method: 'GET',
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateProfilePicture: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-profile-picture`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-password`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useUpdateProfilePictureMutation, useUpdatePasswordMutation } = usersApiSlice;