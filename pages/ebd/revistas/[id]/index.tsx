import { Box, Heading, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { TemplateDashboard } from "../../../../components/TemplateDashboard";
import { supabase } from "../../../../database/supabaseClient";
import { ILesson } from "../../../../entities/lesson";
import { IMagazine } from "../../../../entities/magazine";

type MagazineIdProps = {
  magazine: IMagazine;
  lessons: ILesson[];
};

export default function MagazineId({ magazine, lessons }: MagazineIdProps) {
  const router = useRouter();
  function redirectToNewLesson() {
    router.push(`/ebd/revistas/${magazine.id}/novo`);
  }

  return (
    <TemplateDashboard>
      <Heading mb="5">{magazine.name}</Heading>

      <Stack alignItems={"end"} my={5}>
        <Stack>
          <Box>
            <Tooltip label="Nova Lição">
              <IconButton
                onClick={redirectToNewLesson}
                colorScheme={"teal"}
                aria-label="Novo"
                icon={<FiPlus />}
              />
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      {lessons?.map((lesson) => (
        <Link key={lesson.id} passHref href={`/ebd/licoes/${lesson.id}`}>
          <Box p={5} shadow="md" borderWidth="1px" cursor={"pointer"}>
            <Heading fontSize="xl">{lesson.title}</Heading>
          </Box>
        </Link>
      ))}
    </TemplateDashboard>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id;

  const { data, error } = await supabase
    .from("magazines")
    .select("*")
    .eq("id", id)
    .single();

  const { data: lessons, error: errorLessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("magazine_id", id);

  if (error || errorLessons)
    return {
      redirect: {
        destination: "/ebd/revistas",
      },
    };

  return {
    props: { magazine: data, lessons },
  };
}
