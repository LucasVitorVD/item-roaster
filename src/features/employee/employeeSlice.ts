import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { IEmployee } from "@/types/types"

export const employeeSlice = createApi({
  reducerPath: "employee",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getEmployeesByCurrentItem: builder.query<IEmployee[], number>({
      query: (currentItem) => `employees?item=${currentItem}`
    }),
    addEmployee: builder.mutation<null, IEmployee>({
      query: (employee) => ({
        url: "/employees",
        method: "POST",
        body: employee
      })
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: "PATCH",
        body: employee
      })
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/employees/${id}`,
        method: "DELETE",
        body: id,
      })
    })
  })
})

export const { 
  useGetEmployeesByCurrentItemQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeeSlice