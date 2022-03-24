import { Avatar, Box, Button, Divider, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Member } from "../../entities/member";
import { AvatarPic } from "../AvatarPic";

type MemberFormThirdStepProps = {
  member: Member;
  setMember: (member: Member) => void;
  onFinish: () => void;
};

export const MemberFormThirdStep: React.FC<MemberFormThirdStepProps> = ({
  member,
  onFinish,
  setMember,
}) => {
  const { handleSubmit, register } = useForm();
  // @ts-ignore
  function onFormSubmit(values) {
    setMember({ ...member, ...values });

    onFinish();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <AvatarPic name={member.name} />

        <Stack direction={["column", "row"]}>
          <Box width={"full"}>Telefone: {member.phoneNumber}</Box>
          <Box width={"full"}>Nascimento: {member.birthDate}</Box>
          <Box width={"full"}>Email: {member.email}</Box>
        </Stack>

        <Divider my="2" />

        <Stack direction={["column", "row"]}>
          <Box width={"full"}>Pai: {member.fatherName}</Box>
          <Box width={"full"}>Mãe: {member.motherName}</Box>
        </Stack>

        <Divider my="2" />

        <Stack direction={["column", "row"]}>
          <Box width={"full"}>Estado: {member.birthState}</Box>
          <Box width={"full"}>Cidade: {member.birthCity}</Box>
        </Stack>

        <Divider my="2" />

        <Stack direction={["column", "row"]}>
          <Box width={"full"}>Congregação: {member.congregationPlace}</Box>
          <Box width={"full"}>Data de Batismo: {member.baptismDate}</Box>
        </Stack>

        <Divider my="2" />

        <Stack direction={["column", "row"]}>
          <Box width={"full"}>Estado Civil: {member.civilState}</Box>
          <Box width={"full"}>Fator RH: {member.bloodType}</Box>
          <Box width={"full"}>Escolaridade: {member.education}</Box>
          <Box width={"full"}>Endereço: {member.address}</Box>
          <Box width={"full"}>Conjugue: {member.spouseName}</Box>
        </Stack>

        <Button type="submit" colorScheme={"green"} width="full" my="2">
          Salvar
        </Button>
      </form>
    </>
  );
};
