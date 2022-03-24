import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TemplateDashboard } from "../components/TemplateDashboard";

export default function Home() {
  const router = useRouter();

  function isAuthenticated() {
    return true;
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  if (isAuthenticated()) {
    return (
      <TemplateDashboard>
        <Heading>Home</Heading>
      </TemplateDashboard>
    );
  }
  return null;
}
