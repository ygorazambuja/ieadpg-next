import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { insertMagazine } from "../../../services/magazines";

export default function NewMagazine() {
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await insertMagazine(data);
      toast({
        title: "Revista cadastrada com sucesso",
        status: "success",
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar revista",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TemplateDashboard>
      <Heading mb={5}>Nova Revista</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack my={5}>
          <FormControl>
            <FormLabel>Nome da Revista</FormLabel>
            <Input
              {...register("name")}
              type="text"
              placeholder="ex: Imitadores de Cristo"
            />
          </FormControl>
        </Stack>

        <Stack my={5}>
          <Button isLoading={loading} type="submit">
            Salvar
          </Button>
        </Stack>
      </form>
    </TemplateDashboard>
  );
}
