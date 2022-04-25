import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../database/supabaseClient";

export default function ForgotMyPassword() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const toast = useToast();

  // @ts-ignore
  async function onFormSubmit(values) {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      values.email
    );

    if (error) toast({ title: error.message });

    console.log(data);
  }

  return (
    <Flex
      minHeight="80vh"
      flexDirection="column"
      width="full"
      align="center"
      justifyContent="center"
    >
      <Heading py="8">Esqueci a senha</Heading>
      <Box
        borderWidth={1}
        p={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="Digite seu e-mail"
              {...register("email", { required: "Campo obrigatório" })}
            />
          </FormControl>
          <Button
            mt="8"
            width="full"
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
          >
            Enviar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
