import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface sidebarState {
  toggleMenu: boolean
}

const initialState: sidebarState = {
  toggleMenu: false
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setToggleMenu: (state, action: PayloadAction<boolean>) => {
      state.toggleMenu = action.payload
    }
  }
})

export const { setToggleMenu } = sidebarSlice.actions

export default sidebarSlice.reducer