import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "../database/supabaseClient";

const VARIANT_COLOR = "teal";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const toast = useToast();
  const router = useRouter();

  async function onFormSubmit(values: LoginFormData) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword(values);

    if (error) {
      return toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }

    if (user) {
      await asyncFetchProfile(user);
      toast({
        status: "success",
        title: "Login realizado com sucesso",
        description: "Redirecionando ... ",
      });

      router.push("/");
    }
  }

  async function asyncFetchProfile(user: User) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user", user.id)
      .single();

    if (error) {
      toast({
        status: "error",
        title: "Erro na busca do perfil",
      });
    }

    localStorage.setItem("@ieadpg:profile", JSON.stringify(data));
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
        <Box my={8} textAlign="left">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FormControl isInvalid={!!errors.email}>
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

            <Stack isInline justifyContent="space-between" mt={4}>
              <Box>
                <Checkbox>Lembre de Mim</Checkbox>
              </Box>
              <Box>
                <Link href="/esqueci-minha-senha" passHref>
                  <Text
                    color={`${VARIANT_COLOR}.500`}
                    style={{ cursor: "pointer" }}
                  >
                    Esqueceu a senha ?
                  </Text>
                </Link>
              </Box>
            </Stack>

            <Button
              colorScheme={VARIANT_COLOR}
              width="full"
              mt={4}
              type="submit"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
