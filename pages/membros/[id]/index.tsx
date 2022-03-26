import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Box, Divider, Heading, Stack } from "@chakra-ui/react";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { api } from "../../../services/api";
import { Member } from "../../../entities/member";
import { AvatarPic } from "../../../components/AvatarPic";
import { downloadImage } from "../../../services/members/downloadAvatar";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  const { data } = await api.get(`api/members/${id}`);

  return {
    props: {
      member: data.data,
    },
  };
}

type MemberDetailsProps = {
  member: Member;
};

export default function MemberDetails({ member }: MemberDetailsProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    async function asyncDownloadImage() {
      if (member?.avatar_url) {
        const avatarUrl = await downloadImage(member.avatar_url);
        setAvatarUrl(avatarUrl);
      }
    }
    asyncDownloadImage();
  }, [member.avatar_url]);

  return (
    <TemplateDashboard>
      <Heading>Detalhes</Heading>

      <Stack direction={["column", "row"]} alignItems="center" py="4">
        <AvatarPic name={member.name} src={avatarUrl} size={"xl"} />
        <Box>Nome Completo: {member.name}</Box>
      </Stack>

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          Telefone: {member.phoneNumber}
        </Box>
        <Box width={"full"} py="2">
          Nascimento: {member.birthDate}
        </Box>
        <Box width={"full"} py="2">
          Email: {member.email}
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          Pai: {member.fatherName}
        </Box>
        <Box width={"full"} py="2">
          Mãe: {member.motherName}
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          Estado: {member.birthState}
        </Box>
        <Box width={"full"} py="2">
          Cidade: {member.birthCity}
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          Congregação: {member.congregationPlace}
        </Box>
        <Box width={"full"} py="2">
          Cargo: {member.role}
        </Box>
        <Box width={"full"} py="2">
          Data de Batismo: {member.baptismDate}
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          Estado Civil: {member.civilState}
        </Box>
        <Box width={"full"} py="2">
          Fator RH: {member.bloodType}
        </Box>
        <Box width={"full"} py="2">
          Escolaridade: {member.education}
        </Box>
        <Box width={"full"} py="2">
          Endereço: {member.address}
        </Box>
        <Box width={"full"} py="2">
          Conjugue: {member.spouseName}
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]} py="2">
        <Box width={"full"}>RG: {member.rg}</Box>
        <Box width={"full"}>Data de Emissão: {member.rgEmissionDate}</Box>
        <Box width={"full"}>CPF: {member.cpf}</Box>
      </Stack>
      <Stack direction={["column", "row"]} py="2">
        <Box width={"full"}>Nº Titúlo: {member.voterTitle}</Box>
        <Box width={"full"}>Zona Eleitoral: {member.voterZone}</Box>
        <Box width={"full"}>Sessão: {member.voterSession}</Box>
      </Stack>
      <Divider my="2" />
    </TemplateDashboard>
  );
}
