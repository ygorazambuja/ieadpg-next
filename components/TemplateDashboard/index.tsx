import React, { ReactNode } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiUsers, FiGift } from "react-icons/fi";
import { IconType } from "react-icons";
import { MobileNav } from "../MobileNav";
import { SidebarContent } from "../SideBarContent";
import { Nav } from "../NavBar";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const linkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, route: "/" },
  { name: "Membros", icon: FiUsers, route: "/membros" },
  { name: "Aniversarios", icon: FiGift, route: "/aniversarios" },
  { name: "Perfil", icon: FiUsers, route: "/profile" },
];

export function TemplateDashboard({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Nav />
      <SidebarContent
        LinkItems={linkItems}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} LinkItems={linkItems} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
