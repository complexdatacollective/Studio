import React, { ReactNode } from 'react';
import {
  IconButton,
  Button,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Wrap,
  StackDivider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { FcOrganization, FcHome } from 'react-icons/fc'
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import WrappedLink from '../WrappedLink';
import Footer from '../Footer';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FcHome, href: '/dashboard' },
  { name: 'Organizations', icon: FcOrganization, href: '/dashboard/organizations' },
  { name: 'Studies', icon: FcOrganization, href: '/dashboard/studies' },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <WrappedLink href="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </WrappedLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack spacing={4} divider={<StackDivider borderColor='gray.200' />} align="stretch">
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <WrappedLink
      href={href}
      linkProps={{
        as: Button,
        p: "4",
        mx: "4",
        borderRadius: "lg",
        role: "group",
        cursor: "pointer",
      }}
    >
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: 'white',
        }}
        as={icon}
      />
      {children}
    </WrappedLink>
    );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
                <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='#'>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to='#'>
              Organizations
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              size="lg"
              variant="ghost"
              transition="all 0.3s"
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://secure.gravatar.com/avatar/e5b62a1f2453a4187d5b6d10b915d39e'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing={0}
                  ml="2">
                  <Text fontSize="sm">Joshua Melville</Text>
                  <Text fontSize="xs" color="gray.600">
                    Superadmin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
