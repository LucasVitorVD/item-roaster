import { configureStore } from "@reduxjs/toolkit"
import itemReducer from "../features/item/itemSlice"
import { employeeSlice } from "@/features/employee/employeeSlice"

export const store = configureStore({
  reducer: {
    item: itemReducer,
    [employeeSlice.reducerPath]: employeeSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch