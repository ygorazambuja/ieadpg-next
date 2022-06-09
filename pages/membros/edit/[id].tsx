import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
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
import { AvatarPic } from "../../../components/AvatarPic";
import { convertStringToPascalCase } from "../../../shared/utils/convertStringToPascalCase";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await api.get(`/api/members/${context.params?.id}`);

  const member: Member = {
    ...data.data,
    education: convertStringToPascalCase(data.data.education.trim()),
    civilState: convertStringToPascalCase(data.data.civilState.trim()),
  };

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

  const nextStep = () => setTabIndex(tabIndex + 1);

  const handleStepChange = (index: number) => setTabIndex(index);

  const onAvatarUpload = (avatar: File) => asyncUploadAvatar(avatar);

  const toast = useToast();
  const { push } = useRouter();

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
      await asyncHandleUpsertMemberAvatar(filePath);
    }
  }

  async function asyncHandleUpsertMemberAvatar(Key: string) {
    try {
      await supabase.from("members").upsert(
        {
          ...member,
          avatar_url: Key,
        },
        { returning: "minimal" }
      );

      toast({
        title: "Sucesso",
        description: "Membro atualizado com sucesso",
        status: "success",
      });
      push(`/membros/${member.id}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar membro",
        status: "error",
      });
    }
  }

  const handleMemberUpdate = async (member: Member) => {
    try {
      await supabase.from("members").upsert(
        {
          ...member,
          education: convertStringToPascalCase(member.education.trim()),
          civilState: convertStringToPascalCase(member.civilState.trim()),
        },
        { returning: "minimal" }
      );

      toast({
        title: "Sucesso",
        description: "Membro atualizado com sucesso",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar membro",
        status: "error",
      });
    }
  };

  return (
    <TemplateDashboard>
      <Heading my={4}>Editar</Heading>

      <AvatarPic
        size={"2xl"}
        name={member.name}
        onUpload={onAvatarUpload}
        src={avatar}
      />

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
              onFinish={() => handleMemberUpdate(memberToUpdate)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TemplateDashboard>
  );
}
