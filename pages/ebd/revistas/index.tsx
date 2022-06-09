import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";

type MagazinesProps = {
  magazines: any[];
};

export default function Magazines({ magazines }: MagazinesProps) {
  return (
    <TemplateDashboard>
      <Heading my={5}>Revistas</Heading>

      {magazines.map((magazine) => (
        <Link href={`/ebd/revistas/${magazine.id}`} passHref key={magazine.id}>
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{magazine.name}</Heading>
          </Box>
        </Link>
      ))}
    </TemplateDashboard>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("magazines")
    // .select("*, lessons!inner(*)")
    // .single();
    .select("*");

  if (error) return;
  return {
    props: { magazines: data },
  };
}
