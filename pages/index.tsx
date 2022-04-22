import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Stat } from "../components/Stat";
import { TemplateDashboard } from "../components/TemplateDashboard";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

const stats = [
  { label: "Membros Cadastrados", value: "71,887" },
  { label: "Aniversariantes do Mês", value: "56.87%" },
  { label: "Avg. Click Rate", value: "12.87%" },
];

export default function Home() {
  const { isAuthenticated } = useSupabaseAuth();

  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      push("/login");
    }
  }, [isAuthenticated, push]);

  return (
    <TemplateDashboard>
      <Heading>Home</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
        {stats.map(({ label, value }) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </SimpleGrid>
    </TemplateDashboard>
  );
}
