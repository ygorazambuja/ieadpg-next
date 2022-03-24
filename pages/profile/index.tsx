import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";

import { User } from "@supabase/supabase-js";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { Heading, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { push } = useRouter();

  const fetchProfile = useCallback(() => {
    const profileData = supabase.auth.user();

    if (profileData?.aud !== "authenticated") {
      return push("/login");
    }
    setProfile(profileData);
  }, [push]);

  const signOut = async () => {
    await supabase.auth.signOut();
    push("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <TemplateDashboard>
      <Heading>Perfil</Heading>

      <IconButton
        aria-label="Editar"
        icon={<FiEdit />}
        variant="solid"
        colorScheme="blue"
        onClick={() => push(`/profile/edit/${profile?.id}`)}
      />
    </TemplateDashboard>
  );
}
