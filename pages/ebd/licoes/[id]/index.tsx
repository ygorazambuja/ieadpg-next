import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TemplateDashboard } from "../../../../components/TemplateDashboard";
import { supabase } from "../../../../database/supabaseClient";
import { IDailyVerses } from "../../../../entities/dailyVerses";
import { ILesson } from "../../../../entities/lesson";

type LessonsIdProps = {
  lesson: ILesson;
  dailyVerses: IDailyVerses[];
};

export default function LessonsId({ lesson, dailyVerses }: LessonsIdProps) {
  const [editableLesson, setEditableLesson] = useState(lesson);

  const toast = useToast();
  const router = useRouter();

  const asyncHandleUpdate = async () => {
    await supabase
      .from("lessons")
      .update({
        ...lesson,
        ...editableLesson,
      })
      .eq("id", lesson.id);

    toast({
      title: "Sucesso",
      description: "Aula atualizada com sucesso",
      status: "success",
    });
  };

  const handleRedirectToNewDailyVerse = () => {
    router.push(`/ebd/licoes/${lesson.id}/versiculos`);
  };

  return (
    <TemplateDashboard>
      <Heading mb="5">{editableLesson.title}</Heading>

      <Box my={4}>
        <FormControl>
          <Editable
            defaultValue={editableLesson.title}
            value={editableLesson.title}
            onChange={(title) => {
              setEditableLesson({ ...editableLesson, title });
            }}
            onSubmit={asyncHandleUpdate}
            submitOnBlur={false}
          >
            <FormLabel>Titulo</FormLabel>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </FormControl>
      </Box>

      <StackDivider />
      <Box my={4}>
        <FormControl>
          <Editable
            defaultValue={editableLesson.principal_text}
            value={editableLesson.principal_text}
            onChange={(principal_text) => {
              setEditableLesson({ ...editableLesson, principal_text });
            }}
            onSubmit={asyncHandleUpdate}
            submitOnBlur={false}
          >
            <FormLabel>Texto Aúreo</FormLabel>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </FormControl>
      </Box>

      <StackDivider />

      <Box my={4}>
        <FormControl>
          <Editable
            defaultValue={editableLesson.pratical_true}
            value={editableLesson.pratical_true}
            onChange={(pratical_true) => {
              setEditableLesson({ ...editableLesson, pratical_true });
            }}
            onSubmit={asyncHandleUpdate}
            submitOnBlur={false}
          >
            <FormLabel>Verdade Prática</FormLabel>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </FormControl>
      </Box>

      <Stack my={"12"}>
        <Flex justifyContent={"flex-end"}>
          <Tooltip label="Nova Leitura Diaria">
            <IconButton
              onClick={handleRedirectToNewDailyVerse}
              aria-label="Nova Leitura Diaria"
              colorScheme={"teal"}
              icon={<FiPlus />}
            />
          </Tooltip>
        </Flex>
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
    </TemplateDashboard>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id;

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  const { data: dailyVerses, error: dailyVersesError } = await supabase
    .from("daily_verse")
    .select("*")
    .eq("lesson_id", id);

  if (error || dailyVersesError)
    return {
      props: {
        redirect: {
          destination: "/ebd/licoes",
        },
      },
    };

  return {
    props: {
      lesson,
      dailyVerses,
    },
  };
}
