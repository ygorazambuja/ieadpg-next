import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { useForm } from "react-hook-form";
import { createNewRole } from "../../services/roles";
import { useRouter } from "next/router";

type RoleFormData = {
  name: string;
};

export default function NewCargosPage() {
  const { register, handleSubmit } = useForm<RoleFormData>();
  const toast = useToast();
  const router = useRouter();

  async function handleOnSubmitClick(data: RoleFormData) {
    try {
      await createNewRole(data);

      toast({
        title: "Cargo criado com sucesso",
      });

      router.push("/cargos");
    } catch (error) {
      toast({
        title: "Erro ao criar cargo",
      });
    }
  }

  return (
    <TemplateDashboard>
      <Head>
        <title>Novo Cargo</title>
      </Head>

      <Heading>Novo Cargo</Heading>

      <Flex height={"300px"} justifyContent="center" alignItems={"center"}>
        <FormControl>
          <Box>
            <FormLabel>Nome</FormLabel>
            <Input
              title="Nome"
              placeholder="Nome"
              {...register("name", {
                required: true,
              })}
            />
            <Button
              marginTop={"12px"}
              width={"100%"}
              colorScheme="blue"
              onClick={handleSubmit(handleOnSubmitClick)}
            >
              Salvar
            </Button>
          </Box>
        </FormControl>
      </Flex>
    </TemplateDashboard>
  );
}
