import Head from "next/head";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Stat } from "../components/Stat";
import { TemplateDashboard } from "../components/TemplateDashboard";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

import { supabase } from "../database/supabaseClient";

export async function getServerSideProps() {
  const { count } = await supabase
    .from("members")
    .select("*", { count: "exact" });

  const memberCount = {
    label: "Membros Cadastrados",
    value: count,
  };
  const birthdaysInMonth = {
    label: "Aniversariantes do Mês",
    value: "56",
  };
  const newMembers = {
    label: "Novos Membros",
    value: "12",
  };

  return {
    props: {
      memberCount,
      birthdaysInMonth,
      newMembers,
    },
  };
}

type HomeProps = {
  memberCount: {
    label: string;
    value: string;
  };
  birthdaysInMonth: {
    label: string;
    value: string;
  };
  newMembers: {
    label: string;
    value: string;
  };
};

export default function Home({
  memberCount,
  birthdaysInMonth,
  newMembers,
}: HomeProps) {
  const { isAuthenticated } = useSupabaseAuth();

  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      push("/login");
    }
  }, [isAuthenticated, push]);

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
          key={birthdaysInMonth.label}
          label={birthdaysInMonth.label}
          value={birthdaysInMonth.value}
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
