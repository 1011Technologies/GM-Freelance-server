import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    // Get the current state
    const state = getState();

    // Extract the JWT token from the state
    const jwtToken = state.auth.jwtToken;

    // If the token exists, add it to the headers
    if (jwtToken) {
      headers.set('Authorization', `Bearer ${jwtToken}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});