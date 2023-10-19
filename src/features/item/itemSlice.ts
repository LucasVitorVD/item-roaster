import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IHeaderItems } from "@/types/types";

export interface ItemState {
  headerItems: IHeaderItems[]
  currentItem: number
}

const itemsFromLocalStorage = localStorage.getItem("items")

const initialHeaderItems: IHeaderItems[] = itemsFromLocalStorage ? JSON.parse(itemsFromLocalStorage) : [
  {
    item: 1,
    isDone: false,
  },
  {
    item: 2,
    isDone: false,
  },
  {
    item: 3,
    isDone: false,
  },
  {
    item: 4,
    isDone: false,
  },
  {
    item: 5,
    isDone: false,
  },
  {
    item: 6,
    isDone: false,
  },
  {
    item: 7,
    isDone: false,
  },
  {
    item: 8,
    isDone: false,
  },
  {
    item: 9,
    isDone: false,
  },
]

const initialState: ItemState = {
  currentItem: 1,
  headerItems: initialHeaderItems
}

export const itemSlice = createSlice({
  name: "headerItems",
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<number>) => {
      state.currentItem = action.payload
      
      if (state.currentItem > state.headerItems.length) state.currentItem = 1
    },
    updateItemStatus: (state, action: PayloadAction<boolean>) => {
      const itemIndex = state.headerItems.findIndex(item => item.item === state.currentItem)

      if (itemIndex !== -1) {
        state.headerItems[itemIndex].isDone = action.payload
        localStorage.setItem("items", JSON.stringify(state.headerItems))
      }
    }
  }
})

export const { updateItemStatus, setCurrentItem } = itemSlice.actions

export default itemSlice.reducer