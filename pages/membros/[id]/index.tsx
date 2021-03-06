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
          <strong>Telefone: </strong>
          <span>{member.phoneNumber}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Nascimento: </strong>
          <span>{member.birthDate}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Email: </strong>
          <span>{member.email}</span>
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          <strong>Pai: </strong>
          <span>{member.fatherName}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>M??e: </strong>
          <span>{member.motherName}</span>
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
          <strong>Congrega????o: </strong>
          <span>{member.congregationPlace}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Cargo: </strong>
          <span>{member.role}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Data de Batismo: </strong>
          <span>{member.baptismDate}</span>
        </Box>
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]}>
        <Box width={"full"} py="2">
          <strong>Estado Civil:</strong>
          <span>{member.civilState}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Fator RH: </strong>
          <span>{member.bloodType}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Escolaridade: </strong>
          <span>{member.education}</span>
        </Box>
        <Box width={"full"} py="2">
          <strong>Endere??o: </strong>
          <span>{member.address}</span>
        </Box>
        {member.spouseName?.length > 0 && (
          <Box width={"full"} py="2">
            <strong>Conjugue: </strong>
            <span>{member.spouseName}</span>
          </Box>
        )}
      </Stack>

      <Divider my="2" />

      <Stack direction={["column", "row"]} py="2">
        <Box width={"full"}>
          <strong>RG: </strong>
          <span>{member.rg}</span>
        </Box>
        <Box width={"full"}>
          <strong>Data de Emiss??o: </strong>
          <span>{member.rgEmissionDate}</span>
        </Box>
        <Box width={"full"}>
          <strong>CPF: </strong>
          <span>{member.cpf}</span>
        </Box>
      </Stack>
      <Divider my="2" />
    </TemplateDashboard>
  );
}
