import { Member } from "../../entities/member";

export type MonthState = {
  id: number;
  name: string;
  birthDays: Member[];
};

const INITIAL_MONTH_STATE: MonthState[] = [
  { id: 1, name: "Janeiro", birthDays: [] },
  { id: 2, name: "Fevereiro", birthDays: [] },
  { id: 3, name: "Março", birthDays: [] },
  { id: 4, name: "Abril", birthDays: [] },
  { id: 5, name: "Maio", birthDays: [] },
  { id: 6, name: "Junho", birthDays: [] },
  { id: 7, name: "Julho", birthDays: [] },
  { id: 8, name: "Agosto", birthDays: [] },
  { id: 9, name: "Setembro", birthDays: [] },
  { id: 10, name: "Outubro", birthDays: [] },
  { id: 11, name: "Novembro", birthDays: [] },
  { id: 12, name: "Dezembro", birthDays: [] },
];

export const buildBirthdaysPerMonth = (members: Member[]): MonthState[] => {
  const updatedMonths = INITIAL_MONTH_STATE;

  const memberMonthBirthday = (month: number, member: Member) =>
    new Date(member.birthDate).getMonth() + 1 === month;

  updatedMonths.forEach((month) => {
    month.birthDays = members.filter((member) => {
      if (memberMonthBirthday(month.id, member)) return member;
    });
  });

  return updatedMonths;
};
