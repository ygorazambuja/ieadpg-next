import { Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";
import { ILesson } from "../../../entities/lesson";

type LicoesIdProps = {
  lesson: ILesson;
};

export default function LicoesId({ lesson }: LicoesIdProps) {
  return (
    <TemplateDashboard>
      <Heading>Lição {lesson.title}</Heading>
    </TemplateDashboard>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id;

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return;
  return {
    props: {
      lesson: data,
    },
  };
}
