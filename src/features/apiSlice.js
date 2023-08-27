import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        
        getStripeUrl: builder.mutation({
            query: () => ({
                url: '/api/stripe',
                body: {}, method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'stripe-signature':'value'
                }
            })
            
     })
    }),
});
export const { useGetStripeUrlMutation } = apiSlice;