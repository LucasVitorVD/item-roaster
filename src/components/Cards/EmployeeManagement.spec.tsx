import { renderWithProviders } from "@/test/test-utils";
import EmployeeManagementCard from "./EmployeeManagementCard";

describe("EmployeeManagementCard component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<EmployeeManagementCard />)

    expect(getByRole("managementCard")).toBeInTheDocument()
  })
})