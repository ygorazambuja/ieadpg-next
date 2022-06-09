import { FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { BibleForm } from "../../../components/BibleForm";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";
import { ILesson } from "../../../entities/lesson";

type LessonsIdProps = {
  lesson: ILesson;
};

export default function LessonsId({ lesson }: LessonsIdProps) {
  return (
    <TemplateDashboard>
      <Heading mb="5">{lesson.title}</Heading>
      <FormControl py={"2"}>
        <FormLabel>Legenda</FormLabel>
        <Input placeholder="Digite aqui ... " />
      </FormControl>
      <FormControl py={"2"}>
        <FormLabel>Versiculo</FormLabel>
        <Input placeholder="Digite aqui ... " />
      </FormControl>
      <FormControl py={"2"}>
        <FormLabel>Texto Biblico</FormLabel>
        <Input placeholder="Digite aqui ... " />
      </FormControl>

      <BibleForm />
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
