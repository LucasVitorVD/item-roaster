import { renderWithProviders } from "@/test/test-utils"
import { fireEvent } from "@testing-library/react"
import App from "./App"

describe("App component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<App />)

    expect(getByRole("main")).toBeInTheDocument()
  }),

  it("should show message when the step is finished", () => {
    const { getByRole, getAllByRole } = renderWithProviders(<App />)

    const switchCheckStep = getByRole("checkStep")
    const headerItems = getAllByRole("headerItem")

    expect(switchCheckStep).toBeInTheDocument()

    fireEvent.click(switchCheckStep)
    
    expect(headerItems[0].querySelector("#finishedStepMessage")).toBeInTheDocument()

    fireEvent.click(switchCheckStep)

    expect(headerItems[0].querySelector("#finishedStepMessage")).not.toBeInTheDocument()
  })
})