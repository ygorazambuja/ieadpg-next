import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { AvatarPic } from "../../../components/AvatarPic";
import { TemplateDashboard } from "../../../components/TemplateDashboard";
import { Member } from "../../../entities/member";
import { api } from "../../../services/api";
import { v4 as uuidV4 } from "uuid";
import { supabase } from "../../../database/supabaseClient";
import { useEffect, useState } from "react";
import { downloadImage } from "../../../services/members/downloadAvatar";
import { MemberFormFirstStep } from "../../../components/MemberForm/MemberFormFirstStep";
import { MemberFormSecondStep } from "../../../components/MemberForm/MemberFormSecondStep";
import { MemberFormThirdStep } from "../../../components/MemberForm/MemberFormThirdStep";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await api.get(`/api/members/${context.params?.id}`);

  const member = data.data;

  return {
    props: {
      member,
    },
  };
}

type MemberEditProps = {
  member: Member;
};

export default function MemberEdit({ member }: MemberEditProps) {
  const [avatar, setAvatar] = useState<string>();
  const [tabIndex, setTabIndex] = useState(0);

  const [memberToUpdate, setMemberToUpdate] = useState(member);

  useEffect(() => {
    async function loadAvatar() {
      try {
        if (!member.avatar_url) {
          return;
        }
        const url = await downloadImage(member.avatar_url);
        setAvatar(url);
      } catch (error) {
        console.log(error);
      }
    }
    loadAvatar();
  }, [member.avatar_url]);

  function onAvatarUpload(avatar: File) {
    asyncUploadAvatar(avatar);
  }

  function nextStep() {
    setTabIndex(tabIndex + 1);
  }

  function handleStepChange(index: number) {
    console.log(member);
    setTabIndex(index);
  }

  async function asyncUploadAvatar(file: File) {
    const fileExtension = file.name.split(".").pop();
    const filePath = `${uuidV4()}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("members-profile-avatar")
      .upload(filePath, file);

    if (error) {
      console.log(error);
    }

    if (data) {
      await asyncHandleUpsertMember(filePath);
    }
  }

  async function asyncHandleUpsertMember(Key: string) {
    const { data, error } = await supabase.from("members").upsert(
      {
        ...member,
        avatar_url: Key,
      },
      { returning: "minimal" }
    );
  }

  return (
    <TemplateDashboard>
      <Heading>Editar</Heading>

      {/* <AvatarPic
        size={"2xl"}
        name={member.name}
        onUpload={onAvatarUpload}
        src={avatar}
      /> */}

      <Heading my="4">Novo Membro</Heading>

      <Tabs
        index={tabIndex}
        isFitted
        variant="enclosed"
        onChange={handleStepChange}
      >
        <TabList mb="1em">
          <Tab>Passo 1</Tab>
          <Tab>Passo 2</Tab>
          <Tab>Passo 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MemberFormFirstStep
              member={memberToUpdate}
              setMember={setMemberToUpdate}
              nextStep={nextStep}
            />
          </TabPanel>
          <TabPanel>
            <MemberFormSecondStep
              member={memberToUpdate}
              setMember={setMemberToUpdate}
              nextStep={nextStep}
            />
          </TabPanel>
          <TabPanel>
            <MemberFormThirdStep
              member={memberToUpdate}
              setMember={setMemberToUpdate}
              onFinish={() => {
                console.log(memberToUpdate);
              }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TemplateDashboard>
  );
}
