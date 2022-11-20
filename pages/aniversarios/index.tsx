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
import {
  buildBirthdaysPerMonth,
  MonthState,
} from "../../shared/utils/buildBirthdaysPerMonth";

type BirthDaysProps = {
  months: MonthState[];
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
