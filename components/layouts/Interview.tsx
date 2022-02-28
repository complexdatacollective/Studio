import { ReactNode } from 'react'
import {
  Box
} from '@chakra-ui/react';

export default function InterviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box bgColor="purple.900" p="4" color="white" h="100vh">
      {children}
    </Box>
  )
}
