import { Flex, Spinner, Text } from "@chakra-ui/react";

export function LoadingSpinner() {
  return (
    <Flex
      height="60vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Spinner size="xl" />
      <Text fontSize="xl" fontWeight="bold" marginTop="2">
        Carregando...
      </Text>
    </Flex>
  );
}
