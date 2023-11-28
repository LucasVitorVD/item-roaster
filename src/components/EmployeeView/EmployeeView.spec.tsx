import { renderWithProviders } from "@/test/test-utils"
import EmployeeView from "./EmployeeView"
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node"

describe("", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<EmployeeView />)

    expect(getByRole("button", { name: /Adicionar/i })).toBeInTheDocument()
  }),

  it("should show empty message if there is no data", () => {
    setupServer(
      http.get('http://localhost:3000/employees?item=1', () => {
        return HttpResponse.json([])
      })
    )

    const { getByRole } = renderWithProviders(<EmployeeView />)

    const emptyMessage = getByRole("emptyDataMessage")

    expect(emptyMessage).toBeInTheDocument()
  }),


  it("should render data", async () => {
    const { findAllByRole, queryByRole } = renderWithProviders(<EmployeeView />)

    const emptyMessage = queryByRole("emptyDataMessage")
    const data = await findAllByRole("employeeData")

    expect(emptyMessage).not.toBeInTheDocument()
    expect(data).toHaveLength(1)
  })
})