import {
  Box,
  Container,
  Link,
  SimpleGrid,
  IconButton,
  Input,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BiMailSend } from 'react-icons/bi';

const Logo = (props: any) => {
  return (
    <Heading size="md">Logo</Heading>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  return (
      <Box ml={{ base: 0, md: 60 }} p="4">
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={'#'}>Overview</Link>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Link href={'#'}>Features</Link>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}>
                New
              </Tag>
            </Stack>
            <Link href={'#'}>Tutorials</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Releases</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Information</ListHeader>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Press</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact Us</Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Law Enforcement</Link>
            <Link href={'#'}>Status</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      <Box>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022
        </Text>
      </Box>
            </Container>
    </Box>
  );
}
