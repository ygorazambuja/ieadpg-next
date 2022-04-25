import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Member } from "../../entities/member";
import { AvatarPic } from "../AvatarPic";

type MemberFormThirdStepProps = {
  member: Member;
  // eslint-disable-next-line no-unused-vars
  setMember: (member: Member) => void;
  onFinish: () => void;
};

export const MemberFormThirdStep: React.FC<MemberFormThirdStepProps> = ({
  member,
  onFinish,
  setMember,
}) => {
  const { handleSubmit } = useForm({
    defaultValues: member,
  });
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

        <Button type="submit" colorScheme={"green"} width="full" my="2">
          Salvar
        </Button>
      </form>
    </>
  );
};
