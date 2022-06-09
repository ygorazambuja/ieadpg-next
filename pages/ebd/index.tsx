import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { TemplateDashboard } from "../../components/TemplateDashboard";

export default function index() {
  return (
    <TemplateDashboard>
      {/* <MenuItem>Account Settings</MenuItem> */}

      <Heading>EBD</Heading>

      <Link href={"/ebd/revistas"} passHref>
        <Box p={5} my={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Revistas</Heading>
        </Box>
      </Link>
    </TemplateDashboard>
  );
}
