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
import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import { MemberListTile } from "../../components/MemberListTile";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { Member } from "../../entities/member";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await supabase.from("members").select("*");

  const members = data;

  return {
    props: {
      members,
    },
  };
}

type BirthDaysProps = {
  members: Member[];
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

export default function BirthDays({ members }: BirthDaysProps) {
  const [months, setMonths] = useState(INITIAL_MONTH_STATE);

  const memberMonthBirthday = (month: number, member: Member) =>
    new Date(member.birthDate).getMonth() + 1 === month;

  const buildBirthdaysPerMonth = useCallback(() => {
    const updatedMonths = INITIAL_MONTH_STATE;

    updatedMonths.forEach((month) => {
      month.birthDays = members.filter((member) => {
        if (memberMonthBirthday(month.id, member)) return member;
      });
    });

    setMonths(months);
  }, [members, months]);

  useEffect(() => {
    buildBirthdaysPerMonth();
  }, [members, buildBirthdaysPerMonth]);

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
