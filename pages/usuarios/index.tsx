import {
  Flex,
  Heading,
  IconButton,
  Table,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { FiFilter, FiPlus } from "react-icons/fi";
import { TemplateDashboard } from "../../components/TemplateDashboard";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function UsersPage() {
  return (
    <TemplateDashboard>
      <Heading>Usuários</Heading>

      <Flex justifyContent="flex-end">
        <Tooltip label="Adicionar Cargo">
          <IconButton
            aria-label="Adicionar Cargo"
            icon={<FiPlus />}
            variant="solid"
            colorScheme={"teal"}
            marginRight="2"
            onClick={() => {}}
          />
        </Tooltip>

        <Tooltip label="Filtros" hasArrow>
          <IconButton
            aria-label="Filtros"
            icon={<FiFilter />}
            variant="solid"
            colorScheme={"teal"}
            onClick={() => {}}
          />
        </Tooltip>
      </Flex>

      <Table paddingTop={"2rem"}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
      </Table>
    </TemplateDashboard>
  );
}
