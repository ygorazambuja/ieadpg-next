import Head from "next/head";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Stat } from "../components/Stat";
import { TemplateDashboard } from "../components/TemplateDashboard";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

import { useMembersStore } from "../stores/members";
import { Member } from "../entities/member";
import { getMembersForBirthdayCount } from "../services/members/getMembersForBirthdayCount";
import { buildBirthdaysPerMonth } from "../shared/utils/buildBirthdaysPerMonth";

export async function getServerSideProps() {
  const { members, count } = await getMembersForBirthdayCount();

  const memberCount = {
    label: "Membros Cadastrados",
    value: count,
  };

  const newMembers = {
    label: "Novos Membros",
    value: "12",
  };

  return {
    props: {
      memberCount,
      newMembers,
      members,
    },
  };
}

type HomeProps = {
  memberCount: {
    label: string;
    value: string;
  };

  newMembers: {
    label: string;
    value: string;
  };

  members: Member[];
};

export default function Home({ memberCount, newMembers, members }: HomeProps) {
  const { isAuthenticated } = useSupabaseAuth();

  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      push("/login");
    }
  }, [isAuthenticated, push]);

  const setBirthdayMembers = useMembersStore(
    (state) => state.setBirthdayMembers
  );

  useEffect(() => {
    const monthBirthdays = buildBirthdaysPerMonth(members);
    const currentMonth = new Date().getMonth();

    setBirthdayMembers(monthBirthdays[currentMonth].birthDays);
  }, [setBirthdayMembers, members]);

  const birthdaysInMonth = useMembersStore((state) => state.birthdayMembers);

  return (
    <TemplateDashboard>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Heading>Home</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
        <Stat
          key={memberCount.label}
          label={memberCount.label}
          value={memberCount.value}
        />
        <Stat
          key={"Aniversariantes do Mês"}
          label={"Aniversariantes do Mês"}
          value={String(birthdaysInMonth.length) || "0"}
        />
        <Stat
          key={newMembers.label}
          label={newMembers.label}
          value={newMembers.value}
        />
      </SimpleGrid>
    </TemplateDashboard>
  );
}
