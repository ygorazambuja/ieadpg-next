import {
  Box,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiFilter, FiPlus, FiUpload } from "react-icons/fi";
import { MemberImportSidebar } from "../../components/MemberImportSidebar";
import { MemberListTile } from "../../components/MemberListTile";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { Member } from "../../entities/member";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { api } from "../../services/api";
import { memberImportFile } from "../../services/members/import";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      members: data,
    },
  };
}

type MembersPageProps = {
  members: Member[];
};

export default function MembersPage({ members }: MembersPageProps) {
  const { isAuthenticated } = useSupabaseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const refreshData = async () => {
    return await router.replace(router.asPath);
  };

  const [file, setFile] = useState<File>();

  function handleUploadDrawerOpen() {
    onOpen();
  }

  async function handleUploadClick() {
    setLoading(true);
    try {
      if (!file) return;
      const {
        data: { person },
      } = await memberImportFile(file);

      await api.post("/api/members/import", person);
      toast({
        title: "Importação realizada com sucesso!",
        status: "success",
        isClosable: true,
      });
      await refreshData();
    } catch (error) {
      toast({
        title: "Erro ao realizar importação!",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  }

  function handleFilterClick() {
    console.log("Filter clicked");
  }

  function handleRedirectToNewMember() {
    router.push("/membros/novo");
  }

  return (
    <TemplateDashboard>
      <Heading>Membros</Heading>
      <Flex justifyContent="flex-end">
        <Tooltip label="Adicionar membro">
          <IconButton
            aria-label="Adicionar Membro"
            icon={<FiPlus />}
            variant="solid"
            colorScheme={"teal"}
            marginRight="2"
            onClick={handleRedirectToNewMember}
          />
        </Tooltip>
        <Tooltip label="Importar" hasArrow>
          <IconButton
            aria-label="Importar"
            icon={<FiUpload />}
            variant="solid"
            colorScheme={"teal"}
            marginRight="2"
            onClick={handleUploadDrawerOpen}
          />
        </Tooltip>
        <Tooltip label="Filtros" hasArrow>
          <IconButton
            aria-label="Filtros"
            icon={<FiFilter />}
            variant="solid"
            colorScheme={"teal"}
            onClick={handleFilterClick}
          />
        </Tooltip>
      </Flex>

      <Box paddingTop={"2rem"}>
        {members.map((member) => (
          <MemberListTile
            key={member.id}
            member={member}
            refreshData={refreshData}
          />
        ))}
      </Box>
      <MemberImportSidebar
        isOpen={isOpen}
        file={file}
        setFile={setFile}
        onClose={onClose}
        handleUploadClick={handleUploadClick}
        loading={loading}
      />
    </TemplateDashboard>
  );
}
