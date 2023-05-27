import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-proptech.up.railway.app",
    //baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    //Properties
    getProperties: builder.query({
      query: () => "/property",
      providesTags: ["Property"],
    }),
    updatePropeties: builder.mutation({
      query: (updateBroker) => ({
        url: `/property/${updateBroker.id}`,
        method: "PUT",
        body: updateBroker,
      }),
      invalidatesTags: ["Property"],
    }),

    //Client
    getUsers: builder.query({
      query: () => "/user",
      providesTags: ["Users"],
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    createUsers: builder.mutation({
      query: (newBroker) => ({
        url: "/user",
        method: "POST",
        body: newBroker,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      query: (updateBroker) => ({
        url: `/user/${updateBroker.id}`,
        method: "PUT",
        body: updateBroker,
      }),
      invalidatesTags: ["Users"],
    }),

    //Broker
    getBrokers: builder.query({
      query: () => "/broker",
      providesTags: ["Brokers"],
    }),
    deleteBroker: builder.mutation({
      query: (id) => ({
        url: `/broker/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brokers"],
    }),
    createBroker: builder.mutation({
      query: (newBroker) => ({
        url: "/broker",
        method: "POST",
        body: newBroker,
      }),
      invalidatesTags: ["Brokers"],
    }),
    updateBroker: builder.mutation({
      query: (updateBroker) => ({
        url: "/broker/",
        method: "PUT",
        body: updateBroker,
      }),
      invalidatesTags: ["Brokers"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useUpdatePropetiesMutation,
  useGetUsersQuery,
  useCreateUsersMutation,
  useDeleteUsersMutation,
  useUpdateUsersMutation,
  useGetBrokersQuery,
  useDeleteBrokerMutation,
  useCreateBrokerMutation,
  useUpdateBrokerMutation,
} = apiSlice;
