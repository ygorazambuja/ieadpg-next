import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Member } from "../../entities/member";
import { BLOOD_TYPES, EDUCATION_TYPES } from "../../shared/constants";

type MemberFormFirstStepProps = {
  member: Member;
  setMember: (member: Member) => void;
  nextStep: () => void;
};

type MemberFormFirstStepFormData = {};

export const MemberFormFirstStep: React.FC<MemberFormFirstStepProps> = ({
  setMember,
  nextStep,
  member,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: member,
  });

  // @ts-ignore
  function onFormSubmit(values) {
    setMember({ ...member, ...values });
    nextStep();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl isInvalid={!!errors.name} pt={"2"}>
          <FormLabel>Nome Completo</FormLabel>
          <Input
            {...register("name", { required: "Campo Obrigatório" })}
            placeholder="Mario"
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Stack direction={["column", "row"]}>
          <Box width={"full"}>
            <FormControl pt={"2"}>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                placeholder="00/00/2020"
                type="date"
                {...register("birthDate")}
              />
            </FormControl>
          </Box>
          <Box width={"full"}>
            <FormControl pt={"2"}>
              <FormLabel>Telefone</FormLabel>
              <Input
                placeholder="(99) 9 9999-9999"
                {...register("phoneNumber")}
              />
            </FormControl>
          </Box>
        </Stack>
        <FormControl pt={"2"}>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder="joaozinho@gmail.com" {...register("email")} />
        </FormControl>
        <Stack direction={["column", "row"]}>
          <Flex flex={3}>
            <FormControl pt={"2"}>
              <FormLabel>Escolaridade</FormLabel>
              <Select
                placeholder="Ensino Fundamental"
                {...register("education")}
              >
                {EDUCATION_TYPES.map((education, index) => {
                  console.log({
                    education: member.education,
                  });
                  return (
                    <option value={education} key={index}>
                      {education}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Flex>
          <Flex flex={1}>
            <FormControl pt={"2"}>
              <FormLabel>Fator RH</FormLabel>
              <Select placeholder="A+" {...register("bloodType")}>
                {BLOOD_TYPES.map((bloodType, index) => {
                  return (
                    <option value={bloodType} key={index}>
                      {bloodType}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Flex>
        </Stack>
        <Divider></Divider>
        <FormControl pt={"2"}>
          <FormLabel>Cargo</FormLabel>
          <Input placeholder="Músico" {...register("role")} />
        </FormControl>

        <FormControl pt={"2"}>
          <FormLabel>Data de Batismo</FormLabel>
          <Input
            placeholder="10/10/2010"
            type="date"
            {...register("baptismDate")}
          />
        </FormControl>

        <FormControl pt={"2"}>
          <FormLabel>Congregação</FormLabel>
          <Input
            placeholder="Assembléia de Deus"
            {...register("congregationPlace")}
          />
        </FormControl>

        <FormControl pt={"2"}>
          <FormLabel>Endereço</FormLabel>
          <Input placeholder="Rua das flores" {...register("address")} />
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={8} width="full">
          Proximo Passo
        </Button>
      </form>
    </>
  );
};
