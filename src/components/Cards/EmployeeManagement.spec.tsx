import { renderWithProviders } from "@/test/test-utils";
import { fireEvent } from "@testing-library/react";
import EmployeeManagementCard from "./EmployeeManagementCard";

describe("EmployeeManagementCard component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<EmployeeManagementCard />)

    expect(getByRole("managementCard")).toBeInTheDocument()
  }),

  it("should switch between the components", () => {
    const { getByRole } = renderWithProviders(<EmployeeManagementCard />)

    const addButton = getByRole("button", { name: "+ Adicionar" })

    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)

    const form = getByRole("employeeForm")

    expect(form).toBeInTheDocument()
    expect(addButton).not.toBeVisible()
  })
})