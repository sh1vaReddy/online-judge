import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.jsx";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Register a user
    register: builder.mutation({
      query: (data) => ({
        url: "/sign_up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Login a user
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Logout a user
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // Get user profile
    getProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export default userApi;

// Exporting hooks for use in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = userApi;
