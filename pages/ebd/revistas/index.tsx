import { Box, Heading, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";

type MagazinesProps = {
  magazines: any[];
};

export default function Magazines({ magazines }: MagazinesProps) {
  const router = useRouter();
  function redirectToNewMagazines() {
    router.push("/ebd/revistas/novo");
  }
  return (
    <TemplateDashboard>
      <Heading mb={5}>Revistas</Heading>
      <Stack alignItems={"flex-end"}>
        <Stack py={2}>
          <Box>
            <Tooltip label="Novo">
              <IconButton
                onClick={redirectToNewMagazines}
                colorScheme={"teal"}
                aria-label="Novo"
                icon={<FiPlus></FiPlus>}
              />
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      {magazines.map((magazine) => (
        <Link href={`/ebd/revistas/${magazine.id}`} passHref key={magazine.id}>
          <Box
            cursor={"pointer"}
            p={5}
            shadow="md"
            borderWidth="1px"
            style={{ cursor: "pointer" }}
          >
            <Heading fontSize="xl">{magazine.name}</Heading>
          </Box>
        </Link>
      ))}
    </TemplateDashboard>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("magazines").select("*");

  if (error) return;

  return {
    props: { magazines: data },
  };
}
