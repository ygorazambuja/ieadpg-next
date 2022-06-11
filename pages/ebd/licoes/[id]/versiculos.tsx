import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import { TemplateDashboard } from "../../../../components/TemplateDashboard";
import { supabase } from "../../../../database/supabaseClient";
import { IDailyVerses } from "../../../../entities/dailyVerses";
import { ILesson } from "../../../../entities/lesson";

type DailyVersesForLessonProps = {
  dailyVerses: IDailyVerses[];
  lesson: ILesson;
};

export default function DailyVersesForLesson({
  dailyVerses,
  lesson,
}: DailyVersesForLessonProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("daily_verse").insert({
      ...data,
      lesson_id: lesson.id,
    });

    if (error) {
      return toast({
        title: "Erro",
        description: "Erro ao cadastrar versículo",
        status: "error",
      });
    }

    toast({
      title: "Sucesso",
      description: "Versículo cadastrado com sucesso",
      status: "success",
    });
  };

  return (
    <TemplateDashboard>
      <Heading mb="5">Adicionar Versiculo a Lição</Heading>

      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl my={4}>
            <FormLabel>Legenda</FormLabel>
            <Input {...register("caption")} />
          </FormControl>
          <FormControl my={4}>
            <FormLabel>Versiculo</FormLabel>
            <Input {...register("verse")} />
          </FormControl>
          <FormControl my={4}>
            <FormLabel>Lugar na Biblia Abreviado</FormLabel>
            <Input {...register("bible_location")} placeholder="GN 1.24" />
          </FormControl>

          <FormControl my={4}>
            <FormLabel>Data</FormLabel>
            <Input type="date" {...register("date")} />
          </FormControl>

          <FormControl my={4}>
            <FormLabel>Lição</FormLabel>
            <Input value={lesson.title} disabled />
          </FormControl>
          <Stack my={8}>
            <Button type="submit" colorScheme={"teal"} isLoading={isSubmitting}>
              Adicionar
            </Button>
          </Stack>
        </form>

        <Box my={6}>
          <Stack>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>Leitura Diaria</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Legenda</Th>
                    <Th>Versiculo</Th>
                    <Th>Biblia</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dailyVerses?.map((dailyVerse) => (
                    <Tr key={dailyVerse.id}>
                      <Td>{dailyVerse.caption}</Td>
                      <Td>{dailyVerse.verse}</Td>
                      <Td>{dailyVerse.bible_location}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Box>
      </Stack>
    </TemplateDashboard>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query?.id;

  const { data, error } = await supabase
    .from("daily_verse")
    .select("*")
    .eq("lesson_id", id);

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error || lessonError) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      dailyVerses: data,
      lesson,
    },
  };
}
