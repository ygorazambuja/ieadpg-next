import { GetServerSidePropsContext } from "next";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { api } from "../../../services/api";
import { Member } from "../../../entities/member";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  const { data: member } = await api.get(`api/members/${id}`);

  return {
    props: {
      member,
    },
  };
}

export default function MemberDetails({ member }: { member: Member }) {
  return (
    <TemplateDashboard>
      <Heading>Detalhes</Heading>
    </TemplateDashboard>
  );
}
