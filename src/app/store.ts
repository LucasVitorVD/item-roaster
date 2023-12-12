import { configureStore } from "@reduxjs/toolkit"
import itemReducer from "../features/item/itemSlice"
import sidebarReducer from "../features/sidebar/sidebarSlice"
import { employeeApiSlice } from "@/features/employee/employee-api-slice"

export const store = configureStore({
  reducer: {
    item: itemReducer,
    sidebar: sidebarReducer,
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch