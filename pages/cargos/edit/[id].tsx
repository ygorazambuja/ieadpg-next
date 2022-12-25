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
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { editRole, slugify } from "../../../services/roles";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { GetServerSidePropsContext } from "next";
import { supabase } from "../../../database/supabaseClient";
import { useEffect } from "react";

type RoleFormData = {
  name: string;
  slug: string;
  id: string;
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("id", params?.id)
    .limit(1)
    .single();

  if (error) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      role: data,
    },
  };
}

type EditRolePageProps = {
  role: {
    name: string;
    id: string;
    slug: string;
  };
};

export default function EditCargosPage({ role }: EditRolePageProps) {
  const { register, handleSubmit, watch, setValue } = useForm<RoleFormData>({
    defaultValues: {
      name: role.name,
      slug: role.slug,
      id: role.id,
    },
  });
  const toast = useToast();
  const router = useRouter();

  const watchedName = watch("name");

  useEffect(() => {
    setValue("slug", slugify(watchedName));
  }, [watchedName, setValue]);

  async function handleOnSubmitClick(data: RoleFormData) {
    try {
      await editRole(data);
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
        <title>Editar Cargo</title>
      </Head>

      <Heading>Editar Cargo</Heading>

      <Flex height={"300px"} justifyContent="center" alignItems={"center"}>
        <Box width={"100%"}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              title="Nome"
              placeholder="Nome"
              {...register("name", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl marginTop={"24px"}>
            <FormLabel>Slug</FormLabel>
            <Input
              title="Slug"
              readOnly
              placeholder="Slug"
              {...register("slug", {
                required: true,
              })}
            />
          </FormControl>

          <Button
            marginTop={"12px"}
            width={"100%"}
            colorScheme="blue"
            onClick={handleSubmit(handleOnSubmitClick)}
          >
            Salvar
          </Button>
        </Box>
      </Flex>
    </TemplateDashboard>
  );
}
