import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Member } from "../../entities/member";
import { MARITAL_STATUS } from "../../shared/constants";
import { asyncFetchCities, asyncFetchStates } from "../../services/ibge";
import { useState, useCallback, useEffect } from "react";

type State = {
  id: number;
  nome: string;
};

type City = {
  id: number;
  nome: string;
};
type MemberFormSecondStepProps = {
  setMember: (member: Member) => void;
  member: Member;
  nextStep: () => void;
};

export const MemberFormSecondStep: React.FC<MemberFormSecondStepProps> = ({
  setMember,
  member,
  nextStep,
}) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: member,
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const fetchStates = useCallback(async () => {
    const data = await asyncFetchStates();
    setStates(data);
  }, []);

  const observableState = watch("birthState");

  const fetchCities = useCallback(async () => {
    const data = await asyncFetchCities(watch("birthState"));

    setCities(data);
  }, [watch]);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    if (observableState) {
      fetchCities();
    }
  }, [fetchCities, observableState]);

  // @ts-ignore
  function onFormSubmit(values) {
    values.birthState = convertStateIdToStateName(values);
    values.birthCity = convertCityIdToCityName(values);
    setMember({ ...member, ...values });
    nextStep();
  }
  // @ts-ignore
  function convertStateIdToStateName({ birthState }) {
    return states.find((state) => state.id == birthState)?.nome;
  }
  // @ts-ignore
  function convertCityIdToCityName({ birthCity }) {
    return cities.find((city) => city.id == birthCity)?.nome;
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
              <Input placeholder="000.000.000-00" {...register("cpf")} />
            </FormControl>
          </Box>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>Titulo de Eleitor</FormLabel>
              <Input placeholder="000.000.000" {...register("voterTitle")} />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>Zona Eleitoral</FormLabel>
              <Input placeholder="0000" {...register("voterZone")} />
            </FormControl>
          </Box>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel>Sessão</FormLabel>
              <Input placeholder="000" {...register("voterSession")} />
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
                // value={form.birthState}
                {...register("birthState")}
                // onChange={({ target }) =>
                // setForm({ ...form, birthState: String(target.value) })
                // }
              >
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.nome}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box width="full">
            <FormControl pt="2">
              <FormLabel htmlFor="city">Cidade</FormLabel>
              <Select disabled={!cities?.length} {...register("birthCity")}>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </Select>
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
