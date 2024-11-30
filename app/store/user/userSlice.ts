import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "User",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
  endpoints: (builder) => ({
    fetchUser: builder.query<FetchedUser, void>({
      query: () => ({
        url: "/me",
      }),
      transformResponse: (response: { data: FetchedUser }) => {
        return response.data;
      },
      transformErrorResponse: (error: {
        data?: { message?: string };
        status: number;
      }) => {
        return error.data?.message || `Error: ${error.status}`;
      },
    }),
  }),
});

export const { useFetchUserQuery } = userSlice;
