import { Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { api } from "../../../services/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;
  const profile = await api.get(`api/profile/${id}`);

  return {
    props: {},
  };
}

export default function ProfileEdit() {
  return (
    <TemplateDashboard>
      <Heading>Edição</Heading>
    </TemplateDashboard>
  );
}
