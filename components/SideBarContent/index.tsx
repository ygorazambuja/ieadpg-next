import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { NavItem } from "../NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  LinkItems: Array<{
    name: string;
    icon: IconType;
    route: string;
  }>;
}

export const SidebarContent = ({
  onClose,
  LinkItems,
  ...rest
}: SidebarProps) => {
  const router = useRouter();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            router.push(link.route);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
