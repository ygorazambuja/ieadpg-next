import { Member } from "../../../entities/member";
import { buildBirthdaysPerMonth } from "../buildBirthdaysPerMonth";

const mockedMembers: Member[] = [
  {
    id: "821fd5fe-4c9b-471d-8ba0-0c5aeb4cf7f7",
    memberNumber: null,
    phoneNumber: "(67) 9 9814 -7961",
    created_at: "2022-03-23T17:45:28.420036-04:00",
    birthDate: "2004-04-27",
    email: "albertnatan@gmail.com",
    name: "ALBERT NATAN DE OLIVEIRA",
    fatherName: "LINDOMAR DE OLIVEIRA FERREIRA",
    motherName: "DIVINA FERREIRA MEDEIROS",
    rg: "001 959 553",
    cpf: "078.961.651-39",
    rgEmissionDate: "2010-08-30",
    voterTitle: "",
    voterSession: "",
    voterZone: "",
    birthState: "MS",
    birthCity: "PEDRO GOMES",
    congregationPlace: "ASSEMBLÉIA DE DEUS MISSÕES BELÉM PEDRO GOMES- MS",
    baptismDate: "2010-09-21",
    role: "MÚSICO",
    civilState: "SOLTEIRO(A)",
    bloodType: "O+",
    spouseName: null,
    education: " ENSINO FUNDAMENTAL COMPLETO",
    address: "AQUIDAUANA Nº 100",
    avatar_url: "ee1b51f2-69dc-4672-965b-7606b3f56bb4.jpg",
  },
  {
    id: "dd6bb2c0-d2e0-407c-94e6-97cb8b8b1cc9",
    memberNumber: 0,
    phoneNumber: "(67) 9 9836-3739",
    created_at: "2022-06-08T21:50:27.653955-04:00",
    birthDate: "1994-05-10",
    email: "ygorazambuja@gmail.com",
    name: "YGOR CORREA AZAMBUJA",
    fatherName: "Wolisvon Correa Nogueira",
    motherName: "soraya magda de azambuja",
    rg: "2013820",
    cpf: "045.903.311-52",
    rgEmissionDate: "2017-10-10",
    voterTitle: "",
    voterSession: "",
    voterZone: "",
    birthState: "Mato Grosso do Sul",
    birthCity: "Pedro Gomes",
    congregationPlace: "ASSEMBLÉIA DE DEUS MISSÕES BELÉM PEDRO GOMES- MS",
    baptismDate: "1994-05-10",
    role: "Músico(a)",
    civilState: "Casado(a)",
    bloodType: "A-",
    spouseName: "Izadora Venancio Paes",
    education: "Pós-Graduação Incompleto",
    address: "Rua São Sebastião, 246",
    avatar_url: "",
  },
  {
    id: "e74ba21a-48d9-466a-99a4-4a68a7931fac",
    memberNumber: 0,
    phoneNumber: "67999730036",
    created_at: "2022-06-08T21:55:53.611936-04:00",
    birthDate: "1994-02-18",
    email: "izavepaes@gmail.com",
    name: "Izadora V Paes",
    fatherName: "Jp F PAes",
    motherName: "hielda",
    rg: "93192301",
    cpf: "026.858.031-65",
    rgEmissionDate: "2020-02-19",
    voterTitle: "",
    voterSession: "",
    voterZone: "",
    birthState: "Mato Grosso do Sul",
    birthCity: "Pedro Gomes",
    congregationPlace: "ASSEMBLÉIA DE DEUS MISSÕES BELÉM PEDRO GOMES- MS",
    baptismDate: "1994-03-10",
    role: "Sonoplasta",
    civilState: "Casado(a)",
    bloodType: "",
    spouseName: "Ygor Correa Azambuja",
    education: "Ensino Superior Completo",
    address: "246 Rua são sebastião",
    avatar_url: "a1cbba35-723c-4917-bfea-656b66ff241e.jpeg",
  },
];

describe("buildBirthdaysPerMonth Test Suite", () => {
  it("should return an array of members", () => {
    const months = buildBirthdaysPerMonth(mockedMembers);

    expect(months).toHaveLength(12);
    expect(months[1].birthDays).toHaveLength(1);
  });
});
