import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { supabase } from "../database/supabaseClient";

export default function ResetPassword() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const toast = useToast();

  // @ts-ignore
  async function onFormSubmit(values) {
    const { user, error } = await supabase.auth.update({
      email: "ygorazambuja@gmail.com",
      password: values.password,
    });

    if (error) return toast({ title: error.message, status: "error" });

    return toast({
      status: "success",
      title: "Usuario atualizado",
    });
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box my="8" textAlign={"left"}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Nova Senha</FormLabel>
              <Input
                type="password"
                placeholder="******"
                {...register("password", {
                  required: "Campo Obrigatório",
                  minLength: {
                    value: 6,
                    message: "Senha não pode ter menos de 6 caracteres",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button width="full" my="4" colorScheme="teal" type="submit">
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
