import {
  Editable,
  EditableInput,
  EditablePreview,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
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
      <Editable
        value={lesson.title}
        onSubmit={(e) => {
          console.log(e);
        }}
      >
        <FormLabel>Titulo</FormLabel>
        <EditablePreview />
        <EditableInput />
      </Editable>
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

  if (error)
    return {
      props: {
        redirect: {
          destination: "/ebd/licoes",
        },
      },
    };

  return {
    props: {
      lesson: data,
    },
  };
}
