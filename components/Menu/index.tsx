import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";
import { Profile } from "../../entities/profile";
import { downloadImage } from "../../services/members/downloadAvatar";

export function ProfileMenu() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    function fetchProfileInfoFromLocalStorage() {
      const profileString = localStorage.getItem("@ieadpg:profile");
      if (profileString) {
        const tProfile = JSON.parse(profileString);
        setProfile(tProfile);
        asyncDownloadImage();
      }
    }
    async function asyncDownloadImage() {
      if (profile?.avatar_url) {
        const image = await downloadImage(profile?.avatar_url);
        setAvatarUrl(image);
      }
    }
    fetchProfileInfoFromLocalStorage();
  }, [profile?.avatar_url]);

  async function doLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem("@ieadpg:profile");
    router.replace("/login");
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          name={profile?.name || "Usuário"}
          src={
            avatarUrl || "https://avatars.dicebear.com/api/male/username.svg"
          }
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={
              avatarUrl || "https://avatars.dicebear.com/api/male/username.svg"
            }
          />
        </Center>
        <br />
        <Center>
          <p>{profile?.name}</p>
        </Center>
        <br />
        <MenuDivider />
        {/* <MenuItem>Your Servers</MenuItem> */}
        {/* <MenuItem>Account Settings</MenuItem> */}
        <MenuItem onClick={doLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
