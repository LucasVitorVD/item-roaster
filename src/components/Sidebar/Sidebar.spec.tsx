import { renderWithProviders } from "@/test/test-utils"
import mediaQuery from "css-mediaquery"
import Sidebar from "./Sidebar"

function createMatchMedia(width: number) {
  return (query: unknown) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreenSize(width: number) {
  window.matchMedia = createMatchMedia(width);
}

describe("Sidebar component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<Sidebar />)

    expect(getByRole("sidebar")).toBeInTheDocument()
  }),
  it("should be visible on big screens", async () => {
    const { getByRole } = renderWithProviders(<Sidebar />)

    expect(getByRole("sidebar")).toBeVisible()
  }),
  it("should be hidden on small screens", () => {
    resizeScreenSize(768)

    const { getByRole } = renderWithProviders(<Sidebar />)
    
    expect(getByRole("sidebar")).not.toHaveClass("visible")
  })
})