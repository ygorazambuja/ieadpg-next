import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { MemberFormFirstStep } from "../../components/MemberForm/MemberFormFirstStep";
import { MemberFormSecondStep } from "../../components/MemberForm/MemberFormSecondStep";
import { MemberFormThirdStep } from "../../components/MemberForm/MemberFormThirdStep";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { createMember } from "../../entities/member";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NewMember() {
  const [member, setMember] = useState(createMember());
  const toast = useToast();
  const { push } = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  function nextStep() {
    setTabIndex(tabIndex + 1);
  }

  function handleStepChange(index: number) {
    setTabIndex(index);
  }

  async function addNewMember() {
    console.log(member);

    try {
      await supabase.from("members").insert(member);
      toast({
        title: "Membro cadastrado com sucesso",
        status: "success",
        isClosable: true,
      });
      push("/membros");
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar membro",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <TemplateDashboard>
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
              member={member}
              setMember={setMember}
              nextStep={nextStep}
            />
          </TabPanel>
          <TabPanel>
            <MemberFormSecondStep
              member={member}
              setMember={setMember}
              nextStep={nextStep}
            />
          </TabPanel>
          <TabPanel>
            <MemberFormThirdStep
              setMember={setMember}
              member={member}
              onFinish={addNewMember}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TemplateDashboard>
  );
}
