import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEdit, FiInfo, FiTrash } from "react-icons/fi";
import { Member } from "../../entities/member";
import { api } from "../../services/api";
import { downloadImage } from "../../services/members/downloadAvatar";
import CustomAlertDialog from "../CustomAlertDialog";

type MemberListTileProps = {
  member: Member;
  refreshData?: () => Promise<boolean>;
};

export function MemberListTile({ member, refreshData }: MemberListTileProps) {
  const [avatar, setAvatar] = useState("");
  const {
    isOpen: isEditOpenDialog,
    onOpen: onOpenEditDialog,
    onClose: onEditOpenDialog,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpenDialog,
    onOpen: onOpenDeleteDialog,
    onClose: onDeleteOpenDialog,
  } = useDisclosure();

  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  function redirectEdit() {
    router.push(`/membros/edit/${member.id}`);
  }

  useEffect(() => {
    async function loadAvatar() {
      if (member.avatar_url) {
        const url = await downloadImage(member?.avatar_url);
        setAvatar(url);
      }
    }
    loadAvatar();
  }, [member.avatar_url]);

  async function handleDeleteButton() {
    onDeleteOpenDialog();
    setDeleteButtonLoading(true);
    await api.delete("/api/members/" + member.id);
    setDeleteButtonLoading(false);

    // if (!refreshData) {
    await refreshData();
    // }

    toast({
      title: "Membro excluído com sucesso!",
      status: "success",
    });
  }

  function handleMemberDetailsClick() {
    router.push(`/membros/${member.id}`);
  }

  return (
    <Box
      rounded={"lg"}
      boxShadow="xs"
      p={"4"}
      mb={"2"}
      _hover={{
        background: "white",
        color: "teal.500",
        cursor: "pointer",
      }}
    >
      <Flex h="100px">
        <Center>
          <Avatar src={avatar} size={"xl"} />
        </Center>
        <Flex pl="4" direction={"column"} flex={1} alignSelf={"center"}>
          <Box>
            <Text fontSize={"md"} style={{ fontWeight: "bold" }}>
              {member.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize={"sm"}>{member.role}</Text>
          </Box>
        </Flex>
        <Center>
          <Tooltip label="Acessar">
            <IconButton
              onClick={handleMemberDetailsClick}
              aria-label="Acessar"
              variant="outline"
              icon={<FiInfo />}
              colorScheme={"blue"}
            />
          </Tooltip>
          <Tooltip label="Editar" fontSize={"md"}>
            <IconButton
              onClick={onOpenEditDialog}
              colorScheme={"orange"}
              aria-label="Edit"
              icon={<FiEdit />}
              variant="outline"
            />
          </Tooltip>
          <Tooltip label="Remover" fontSize={"md"}>
            <IconButton
              onClick={onOpenDeleteDialog}
              colorScheme={"red"}
              variant="outline"
              aria-label="Delete"
              icon={<FiTrash />}
              isLoading={deleteButtonLoading}
            />
          </Tooltip>
        </Center>
      </Flex>
      <CustomAlertDialog
        isOpen={isEditOpenDialog}
        onClose={onEditOpenDialog}
        onConfirm={redirectEdit}
        title="Editar membro"
        confirmText="Editar"
        cancelText="Cancelar"
        body="Você tem certeza que deseja editar este membro?"
      />
      <CustomAlertDialog
        isOpen={isDeleteOpenDialog}
        onClose={onDeleteOpenDialog}
        onConfirm={handleDeleteButton}
        title="Remover Membro"
        confirmText="Remover"
        cancelText="Cancelar"
        body="Você tem certeza que deseja remover este membro?"
      />
    </Box>
  );
}
