import { renderWithProviders } from "@/test/test-utils"
import { fireEvent, waitFor } from "@testing-library/react"
import EmployeeForm from "./Form"
import { IEmployee } from "@/types/types"

const preloadData: IEmployee = {
  isActive: true,
  employeeName: "Lucas",
  cpf: "083.135.601-42",
  rg: "3909883",
  gender: "M",
  birthDate: "17/08/2004",
  position: "junior",
  hasEpi: false,
  employeeEpis: [
    {
      activity: "activity1",
      epis: {
        epi: "calcado-seguranca",
        ca: 12
      }
    }
  ],
  employeeFile: "",
  item: 1,
  id: 1
}

describe("EmployeeForm component", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<EmployeeForm />)

    expect(getByRole("employeeForm")).toBeTruthy()
  }),

  it("should show error message if empty input", async () => {
    const { getByLabelText, getByRole, findByText } = renderWithProviders(<EmployeeForm />)

    const inputName = getByLabelText("Nome:")

    expect(inputName).toBeInTheDocument()

    const saveButton = getByRole("button", { name: /Salvar/i })

    expect(saveButton).toBeInTheDocument()

    fireEvent.click(saveButton)

    const errorMessage = await findByText("O nome precisa ter mais de 2 caracteres.")

    expect(errorMessage).toBeInTheDocument()
  }),

  it("should hide the EPI form if checkbox is true", () => {
    const { getByLabelText, getByRole } = renderWithProviders(<EmployeeForm />)

    const checkbox = getByLabelText("O trabalhador não usa EPI.")

    expect(checkbox).toBeInTheDocument()

    const epiForm = getByRole("epiForm")

    expect(epiForm).toBeInTheDocument()

    fireEvent.click(checkbox)

    expect(epiForm).not.toBeVisible()
  }),

  it("should save without errors", async () => {
    const { getByRole, queryByText } = renderWithProviders(<EmployeeForm preloadedData={preloadData} />)

    const saveButton = getByRole("button", { name: /Salvar/i })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(queryByText("O nome precisa ter mais de 2 caracteres.")).not.toBeInTheDocument()
    })
  }),

  it("should add more fields in EPI form", () => {
    const { getByRole, getAllByRole } = renderWithProviders(<EmployeeForm />)

    const addNewFieldButton = getByRole("button", { name: /Adicionar/i })

    expect(addNewFieldButton).toBeInTheDocument()

    fireEvent.click(addNewFieldButton)

    const epiForm = getAllByRole("epiForm")

    expect(epiForm).toHaveLength(2)
  }),

  it("should remove fields in EPI form", () => {
    const { getByRole, getAllByRole } = renderWithProviders(<EmployeeForm />)

    const addNewFieldButton = getByRole("button", { name: /Adicionar/i })

    expect(addNewFieldButton).toBeInTheDocument()

    fireEvent.click(addNewFieldButton)

    const epiFields = getAllByRole("epiForm")

    expect(epiFields).toHaveLength(2)

    const removeFieldButton = getAllByRole("removeFieldButton")

    expect(removeFieldButton[0]).toBeInTheDocument()
    expect(removeFieldButton).toHaveLength(2)

    fireEvent.click(removeFieldButton[0])

    expect(getAllByRole("epiForm")).toHaveLength(1)
  })
})