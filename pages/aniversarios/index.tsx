import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Heading,
} from "@chakra-ui/react";
import { MemberListTile } from "../../components/MemberListTile";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { Member } from "../../entities/member";

type BirthDaysProps = {
  months: MonthState[];
};

type MonthState = {
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

const buildBirthdaysPerMonth = (members: Member[]) => {
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

export async function getServerSideProps() {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    return {
      props: {
        redirect: {
          destination: "/login",
        },
      },
    };
  }

  const months = buildBirthdaysPerMonth(data);

  return {
    props: {
      months,
    },
  };
}

export default function BirthDays({ months }: BirthDaysProps) {
  return (
    <TemplateDashboard>
      <Heading pb={10}>Aniversarios</Heading>

      <Accordion>
        {months.length > 0 &&
          months.map((month) => (
            <AccordionItem key={month.id}>
              <h2>
                <AccordionButton role={"heading"}>
                  <Box flex="1" textAlign="left">
                    {month.name}
                  </Box>
                  <Badge
                    mr={4}
                    colorScheme={month.birthDays.length > 0 ? "green" : "red"}
                  >
                    Membros: {month.birthDays.length}
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {month.birthDays.map((member) => {
                  return <MemberListTile member={member} key={member.id} />;
                })}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </TemplateDashboard>
  );
}
