import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TemplateDashboard } from "../../../../components/TemplateDashboard";
import { IMagazine } from "../../../../entities/magazine";
import { addLessonInMagazine } from "../../../../services/lessons";
import { getMagazineById } from "../../../../services/magazines";

type NewLessonForMagazineProps = {
  magazine: IMagazine;
};

export default function NewLessonForMagazine({
  magazine,
}: NewLessonForMagazineProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      magazine_id: magazine.id,
      title: "",
      pratical_true: "",
      principal_text: "",
    },
  });

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await addLessonInMagazine(data);
      toast({
        title: "Sucesso",
        description: "Lição cadastrada com sucesso!",
        status: "success",
      });
      router.back();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar a lição",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TemplateDashboard>
      <Heading mb="5">Nova Lição</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl my={3}>
          <FormLabel>Revista</FormLabel>
          <Input value={magazine.name} disabled />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Título da Lição</FormLabel>
          <Input {...register("title")} />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Texto Aúreo</FormLabel>
          <Input {...register("principal_text")} />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Verdade Prática</FormLabel>
          <Input {...register("pratical_true")} />
        </FormControl>

        <Stack>
          <Button isLoading={isLoading} type="submit" colorScheme={"teal"}>
            Salvar
          </Button>
        </Stack>
      </form>
    </TemplateDashboard>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id;

  if (!id)
    return {
      props: {
        redirect: {
          destination: "/ebd/revistas",
        },
      },
    };

  try {
    const data = await getMagazineById(String(id));
    return {
      props: {
        magazine: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/ebd/revistas",
      },
    };
  }
}
