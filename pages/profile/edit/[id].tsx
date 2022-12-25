import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AvatarPic } from "../../../components/AvatarPic";

import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { supabase } from "../../../database/supabaseClient";
import { downloadImage } from "../../../services/members/downloadAvatar";

export default function ProfileEdit() {
  const [avatar, setAvatar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: profileData?.name,
      email: profileData?.email,
    },
  });

  const fetchProfile = useCallback(async () => {
    const userData = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user", userData?.data?.user?.id)
      .single();

    setProfileData({ ...userData?.data?.user, ...data });

    setValue("name", profileData?.name);
    setValue("email", profileData?.email);

    setLoading(false);
  }, [setValue, profileData?.name, profileData?.email]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (profileData?.avatar_url) {
      downloadImage(profileData.avatar_url).then((avatar) => setAvatar(avatar));
    }
  }, [profileData?.avatar_url]);

  const updateAvatar = (avatar: File) => {
    console.log(avatar);
  };

  return (
    <TemplateDashboard loading={loading}>
      <Heading mb={8}>Edição</Heading>

      <AvatarPic
        name={profileData?.name}
        src={avatar}
        onUpload={updateAvatar}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={() => (
            <FormControl pt={4}>
              <FormLabel>Nome</FormLabel>
              <Input value={profileData?.name}></Input>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={() => (
            <FormControl pt={4}>
              <FormLabel>E-mail</FormLabel>
              <Input disabled value={profileData?.email}></Input>
            </FormControl>
          )}
        />

        <Button my={4} type="submit">
          Salvar
        </Button>
      </form>
    </TemplateDashboard>
  );
}
