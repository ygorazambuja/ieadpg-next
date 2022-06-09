import { Box, Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";
import { IMagazine } from "../../../entities/magazine";

type MagazineIdProps = {
  magazine: IMagazine;
};

export default function MagazineId({ magazine }: MagazineIdProps) {
  return (
    <TemplateDashboard>
      <Heading mb="5">{magazine.name}</Heading>

      {magazine.lessons?.map((lesson) => (
        <Link key={lesson.id} passHref href={`/ebd/licoes/${lesson.id}`}>
          <Box p={5} shadow="md" borderWidth="1px">
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
    .select("*, lessons!inner(*)")
    .eq("id", id)
    .single();

  if (error) return;

  return {
    props: { magazine: data },
  };
}
