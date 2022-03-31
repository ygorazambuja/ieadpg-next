import { Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { AvatarPic } from "../../../components/AvatarPic";

import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";
import { Profile } from "../../../entities/profile";
import { downloadImage } from "../../../services/members/downloadAvatar";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  return {
    props: {
      profile: data,
    },
  };
}

type ProfileEditProps = {
  profile: Profile;
};

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadImage(profile.avatar_url).then((avatar) => setAvatar(avatar));
    }
  }, [profile?.avatar_url]);

  return (
    <TemplateDashboard>
      <Heading>Edição</Heading>

      <AvatarPic name={profile?.name} src={avatar}></AvatarPic>
    </TemplateDashboard>
  );
}
