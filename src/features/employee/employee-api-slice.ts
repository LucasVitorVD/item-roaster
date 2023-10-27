import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { IEmployee } from "@/types/types"

export const employeeApiSlice = createApi({
  reducerPath: "employee",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployeesByCurrentItem: builder.query<IEmployee[], number>({
      query: (currentItem) => `employees?item=${currentItem}`,
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation<null, IEmployee>({
      query: (employee) => ({
        url: "/employees",
        method: "POST",
        body: employee
      }),
      invalidatesTags: ['Employees'],
    }),
    updateEmployee: builder.mutation<null, { id: number, data: IEmployee }>({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['Employees'],
    }),
    deleteEmployee: builder.mutation<null, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Employees'],
    })
  })
})

export const { 
  useGetEmployeesByCurrentItemQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeeApiSlice