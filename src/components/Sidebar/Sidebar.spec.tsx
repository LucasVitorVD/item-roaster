import { renderWithProviders } from "@/test/test-utils"
import Sidebar from "./Sidebar"

describe("Sidebar component", () => {
  it("should render correctly", () => {
    const mockToggle = jest.fn()

    const { getByRole } = renderWithProviders(<Sidebar setToggleMenu={mockToggle} toggleMenu={false} />)

    expect(getByRole("sidebar")).toBeInTheDocument()
  }),
  it("should the sidebar be closed", () => {
    const mockToggle = jest.fn()

    const { getByRole } = renderWithProviders(<Sidebar setToggleMenu={mockToggle} toggleMenu={false} />)

    expect(getByRole("sidebar")).toHaveClass("invisible")
  }),
  it("should the sidebar be opened", () => {
    const mockToggle = jest.fn()

    const { getByRole } = renderWithProviders(<Sidebar setToggleMenu={mockToggle} toggleMenu={true} />)
    
    expect(getByRole("sidebar")).toHaveClass("visible")
  })
})