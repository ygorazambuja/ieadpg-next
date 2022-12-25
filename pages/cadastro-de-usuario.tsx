import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "../database/supabaseClient";

export default function UsersFormPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const router = useRouter();

  async function formSubmit(values: any) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
        },
      },
    });

    console.log(data);

    if (error) {
      console.log(error);
      return;
    }

    router.replace("/login");
    return;
  }

  return (
    <Flex
      minHeight={"80vh"}
      width="full"
      align="center"
      justifyContent="center"
      direction={"column"}
    >
      <Heading>Cadastro</Heading>

      <Box my={8} width={"400px"}>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormControl mt={4} isInvalid={!!errors.name}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="João da Silva"
              {...register("name", {
                required: "Campo obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={!!errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              placeholder="joaozinho@gmail.com"
              {...register("email", { required: "Campo obrigatório" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.password}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="******"
              {...register("password", {
                required: "Campo Obrigatório",
                minLength: {
                  value: 6,
                  message: "Quantidade minima para senha é 6",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.confirmation_password}>
            <FormLabel>Confirmação de Senha</FormLabel>
            <Input
              type="password"
              placeholder="******"
              {...register("confirmation_password", {
                required: "Campo Obrigatório",
                minLength: {
                  value: 6,
                  message: "Quantidade minima para senha é 6",
                },
                validate: (value) =>
                  value === getValues("password") || "As senhas não são iguais",
              })}
            />
            <FormErrorMessage>
              {errors.confirmation_password &&
                errors.confirmation_password.message}
            </FormErrorMessage>
          </FormControl>

          <Box my={4}>
            <Button colorScheme={"teal"} width="full" type="submit">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}
