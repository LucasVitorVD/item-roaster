import { renderWithProviders } from "@/test/test-utils"
import App from "./App"

describe("App component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<App />)

    expect(getByRole("main")).toBeInTheDocument()
  })
})