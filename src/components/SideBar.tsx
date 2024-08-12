import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown, FiBookOpen } from "react-icons/fi";
import { IconType } from "react-icons";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { ToggleTheme } from "./ToggleTheme";

interface SidebarWithHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  setSelectedPage: Dispatch<SetStateAction<string>>;
  selectedPage: string;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  selecetdPage: string;
  setSelectedPage: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Cursos", icon: FiHome },
  { name: "Relatórios", icon: FiBookOpen },
];

const SidebarContent = ({
  onClose,
  setSelectedPage,
  ...rest
}: SidebarProps & { setSelectedPage: (page: string) => void }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        gap={4}
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Text
          display={{ base: "flex" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          <Heading color="purple.400">Twygo</Heading>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            onClose();
            setSelectedPage(link.name);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({
  onOpen,
  selecetdPage,
  setSelectedPage,
  ...rest
}: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Heading>{selecetdPage}</Heading>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Administrador</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => setSelectedPage("Cursos")}>
                Cursos
              </MenuItem>
              <MenuItem onClick={() => setSelectedPage("Relatórios")}>
                Relatórios
              </MenuItem>
              <MenuDivider />
              <ToggleTheme />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader: React.FC<SidebarWithHeaderProps> = ({
  children,
  setSelectedPage,
  selectedPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        setSelectedPage={setSelectedPage}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} setSelectedPage={setSelectedPage} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        selecetdPage={selectedPage}
        setSelectedPage={setSelectedPage}
        onOpen={onOpen}
      />
      <Box ml={{ base: 0, md: 60 }} p="0">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
