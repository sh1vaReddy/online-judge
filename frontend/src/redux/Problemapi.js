import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from '../constants/config.jsx';

const problemapi = createApi({
  reducerPath: "problemapi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["Problem"],

  endpoints: (builder) => ({
    createProblem: builder.mutation({
      query: (data) => ({
        url: "/create/problem",
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Problem"],
    }),

    getAllProblems: builder.query({
      query: () => ({
        url: "/api/v1/getallproblems",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Problem"],
    }),

    updateProblem: builder.mutation({
      query: (data) => ({
        url: "/api/v1/update/problems",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Problem"],
    }),

    deleteProblem: builder.mutation({
      query: (data) => ({
        url: "/api/v1/problems",
        method: "DELETE",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Problem"],
    }),

    getProblemById: builder.query({
      query: (id) => ({
        url: `/api/v1/problems/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Problem"],
    }),
    getProblemByTitle: builder.query({
      query: (title) => ({
        url: `/api/v1/problems/title/${title}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Problem"],
    }),
  }),
});

export const {
  useCreateProblemMutation,
  useGetAllProblemsQuery,
  useUpdateProblemMutation,
  useDeleteProblemMutation,
  useGetProblemByIdQuery,
  useGetProblemByTitleQuery,
} = problemapi;

export default problemapi;