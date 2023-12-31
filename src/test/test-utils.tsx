import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store"
import { store } from "@/app/store"

// Resize error when used fireEvent
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppDispatch
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}