import { renderWithProviders } from "@/test/test-utils"
import { fireEvent } from "@testing-library/react"
import HeaderCard from "./HeaderCard"

describe("HeaderCard component", () => {
  it("should render all items correctly", () => {
    const { getAllByRole } = renderWithProviders(<HeaderCard />)

    expect(getAllByRole("headerItem")).toHaveLength(9)
  }),

  it("should have a border when clicked", () => {
    const { getAllByRole } = renderWithProviders(<HeaderCard />)

    const button = getAllByRole("button")

    fireEvent.click(button[1])

    expect(button[1]).toHaveClass("border border-blue-800")
    expect(button[0]).not.toHaveClass("border border-blue-800")
  })
})