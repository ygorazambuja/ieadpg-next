import { Box, Center, Heading, Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MagicLinkPage() {
  const router = useRouter();

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("Loading...");
        router.replace("/");
        resolve("done");
      }, 2000);
    });
  }, [router]);

  return (
    <Box h={"100vh"}>
      <Center>
        <Heading>Redirecionando</Heading>
        <Progress size="xs" isIndeterminate />
      </Center>
    </Box>
  );
}

export default MagicLinkPage;
