import {
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MemberFormFirstStep } from "../../components/MemberForm/MemberFormFirstStep";
import { MemberFormSecondStep } from "../../components/MemberForm/MemberFormSecondStep";
import { MemberFormThirdStep } from "../../components/MemberForm/MemberFormThirdStep";
import { TemplateDashboard } from "../../components/TemplateDashboard";
import { supabase } from "../../database/supabaseClient";
import { createMember } from "../../entities/member";

export default function NewMember() {
  const [member, setMember] = useState(createMember());

  const [tabIndex, setTabIndex] = useState(0);

  function nextStep() {
    setTabIndex(tabIndex + 1);
  }

  function handleStepChange(index: number) {
    console.log(member);
    setTabIndex(index);
  }

  async function addNewMember() {
    const { data, error } = await supabase.from("members").insert(member);
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
