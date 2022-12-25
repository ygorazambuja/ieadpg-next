import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";

import { TemplateDashboard } from "../../components/TemplateDashboard";
import {
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { downloadImage } from "../../services/members/downloadAvatar";

export function getServerSideProps() {
  return {
    props: {},
  };
}

type User = {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { push } = useRouter();

  const fetchProfile = useCallback(async () => {
    const userData = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user", userData?.data?.user?.id)
      .single();

    const avatar_url = await downloadImage(data?.avatar_url);

    setProfile({ ...userData?.data?.user, ...data, avatar_url });

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <TemplateDashboard loading={loading}>
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

      <Avatar name={profile?.name} src={profile?.avatar_url}></Avatar>

      <FormControl pt={4}>
        <FormLabel>Nome</FormLabel>
        <Input readOnly value={profile?.name}></Input>
      </FormControl>

      <FormControl pt={4}>
        <FormLabel>E-mail</FormLabel>
        <Input readOnly value={profile?.email}></Input>
      </FormControl>
    </TemplateDashboard>
  );
}
