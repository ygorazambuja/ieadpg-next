import {
  Flex,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit, FiFilter, FiPlus, FiTrash } from "react-icons/fi";
import CustomAlertDialog from "../../components/CustomAlertDialog";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { removeRole } from "../../services/roles";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      roles: data,
    },
  };
}

type Role = {
  id: string;
  name: string;
  view_name: string;
};

type RolesPageProps = {
  roles: Role[];
};

export default function CargosPage({ roles }: RolesPageProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedRole, setSelectedRole] = useState<Role>();

  const handleRedirectToNewRole = () => {
    router.push("/cargos/novo");
  };

  const handleRedirectToEditRole = (id: string) => {
    router.push(`/cargos/edit/${id}`);
  };

  return (
    <TemplateDashboard>
      <Head>
        <title>Cargos</title>
      </Head>
      <Heading>Cargos</Heading>

      <Flex justifyContent="flex-end">
        <Tooltip label="Adicionar Cargo">
          <IconButton
            aria-label="Adicionar Cargo"
            icon={<FiPlus />}
            variant="solid"
            colorScheme={"teal"}
            marginRight="2"
            onClick={handleRedirectToNewRole}
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

      {roles.length > 0 && (
        <Table paddingTop={"2rem"}>
          <Thead>
            <Tr>
              <Th>Nome de exibição</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role) => (
              <Tr key={role.id}>
                <Td>{role.name}</Td>
                <Td>
                  <Tooltip label="Editar" fontSize={"md"}>
                    <IconButton
                      onClick={() => {
                        handleRedirectToEditRole(role.id);
                      }}
                      colorScheme={"orange"}
                      aria-label="Edit"
                      icon={<FiEdit />}
                      variant="outline"
                      marginRight={"2"}
                    />
                  </Tooltip>
                  <Tooltip label="Editar" fontSize={"md"}>
                    <IconButton
                      onClick={() => {
                        setSelectedRole(role);
                        onOpen();
                      }}
                      colorScheme={"red"}
                      aria-label="Remove"
                      icon={<FiTrash />}
                      variant="outline"
                      marginRight={"2"}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Remover Cargo"
        body="Tem certeza que deseja remover este cargo?"
        onConfirm={() => {
          if (selectedRole) {
            removeRole(selectedRole.id);
            onClose();
            setSelectedRole(undefined);
          }

          router.replace(router.asPath);
        }}
        cancelText="Cancelar"
        confirmText="Remover"
      />
    </TemplateDashboard>
  );
}
