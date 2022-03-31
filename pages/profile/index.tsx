import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";

import { User } from "@supabase/supabase-js";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { ListTile } from "../../components/ListTile";

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { push } = useRouter();

  const fetchProfile = useCallback(async () => {
    const userData = supabase.auth.user();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userData?.id)
      .single();

    setProfile(data);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <TemplateDashboard>
      <Heading>Perfil</Heading>

      <Flex justifyContent={"flex-end"}>
        <IconButton
          aria-label="Editar"
          icon={<FiEdit />}
          variant="solid"
          colorScheme="blue"
          onClick={() => push(`/profile/edit/${profile?.id}`)}
        />
      </Flex>

      <Avatar name={profile?.email}></Avatar>
      <ListTile label={"E-mail"} value={profile?.email}></ListTile>
    </TemplateDashboard>
  );
}
