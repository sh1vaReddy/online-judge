import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.jsx";

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
        body: data,
      }),
      invalidatesTags: ["Problem"],
    }),

    getAllProblems: builder.query({
      query: () => ({
        url: "/getallproblems",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Problem"],
    }),

    updateProblem: builder.mutation({
      query: (data) => ({
        url: "/update/problems",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Problem"],
    }),

    deleteProblem: builder.mutation({
      query: (data) => ({
        url: "/problems",
        method: "DELETE",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Problem"],
    }),

    getProblemById: builder.query({
      query: (id) => ({
        url: `/problems/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Problem"],
    }),
    getProblemByTitle: builder.query({
      query: (title) => ({
        url: `/problems/title/${title}`,
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
