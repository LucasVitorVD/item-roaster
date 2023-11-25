import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/employees?item=1", () => {
    return HttpResponse.json([
      {
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
    ])
  })
]