import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Member } from "../../entities/member";
import { BRAZILIAN_STATES, MARITAL_STATUS } from "../../shared/constants";
import { asyncFetchCities } from "../../services/ibge";
import React, { useState, useCallback, useEffect } from "react";
import { converStateNameToId } from "../../shared/utils/convertStateNameToId";

type City = {
  id: number;
  nome: string;
};
type MemberFormSecondStepProps = {
  // eslint-disable-next-line no-unused-vars
  setMember: (member: Member) => void;
  member: Member;
  nextStep: () => void;
};

export const MemberFormSecondStep: React.FC<MemberFormSecondStepProps> = ({
  setMember,
  member,
  nextStep,
}) => {
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: member,
  });

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const observableState = watch("birthState");

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const convertedStateNameToId = converStateNameToId(observableState);
      const data = await asyncFetchCities(convertedStateNameToId);
      setCities(data);

      if (member.birthCity) {
        setValue("birthCity", member.birthCity);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [observableState, setValue, member.birthCity]);

  useEffect(() => {
    if (observableState) {
      fetchCities();
    }
  }, [fetchCities, observableState]);

  // @ts-ignore
  function onFormSubmit(values) {
    setMember({
      ...member,
      fatherName: values.fatherName,
      motherName: values.motherName,
      civilState: values.civilState,
      spouseName: values.spouseName,
      rg: values.rg,
      rgEmissionDate: values.rgEmissionDate,
      cpf: values.cpf,
      voterTitle: values.voterTitle,
      voterZone: values.voterZone,
      voterSession: values.voterSession,
      birthState: values.birthState,
      birthCity: values.birthCity,
    });
    nextStep();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl pt={"2"}>
          <FormLabel>Nome do Pai</FormLabel>
          <Input placeholder="Jose do Egito" {...register("fatherName")} />
        </FormControl>

        <FormControl pt={"2"}>
          <FormLabel>Nome da Mãe</FormLabel>
          <Input placeholder="Maria" {...register("motherName")} />
        </FormControl>

        <Divider py={2}></Divider>

        <FormControl pt={"2"}>
          <FormLabel>Estado Civil</FormLabel>
          <Select placeholder="" {...register("civilState")}>
            {MARITAL_STATUS.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl pt={"2"}>
          <FormLabel>Nome do Conjugue</FormLabel>
          <Input {...register("spouseName")} placeholder="Maria" />
        </FormControl>

        <Stack direction={["column", "row"]}>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>RG</FormLabel>
              <Input placeholder="00000-00" {...register("rg")} />
            </FormControl>
          </Box>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>Data de Emissão</FormLabel>
              <Input type={"date"} {...register("rgEmissionDate")} />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>CPF</FormLabel>
              <Input
                placeholder="000.000.000-00"
                {...register("cpf")}
                // ref={cpfRef as React.RefObject<HTMLInputElement>}
              />
            </FormControl>
          </Box>
        </Stack>

        <Divider py="2" />

        <Stack direction={["column", "row"]}>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel htmlFor="state">Estado</FormLabel>
              <Select
                placeholder="Selecione o Estado"
                {...register("birthState")}
              >
                {BRAZILIAN_STATES.map((state) => {
                  return (
                    <option key={state.id} value={state.nome}>
                      {state.nome}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel htmlFor="city">Cidade</FormLabel>
              {loading ? (
                <Spinner />
              ) : (
                <Select disabled={!cities?.length} {...register("birthCity")}>
                  {cities?.map((city) => (
                    <option key={city.id} value={city.nome}>
                      {city.nome}
                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </Stack>
        <Button width={"full"} my="2" colorScheme={"teal"} type="submit">
          Proximo passo
        </Button>
      </form>
    </>
  );
};
