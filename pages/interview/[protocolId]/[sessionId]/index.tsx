// Main interview session view

import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import InterviewLayout from "../../../../components/layouts/Interview"
import { useQuery } from 'react-query';
import { Container, Heading } from '@chakra-ui/react';

const InterviewSession = () => {
  const router = useRouter();
  console.log(router);

  // const { data, isLoading }  = useQuery('session', async () => {
  //   const result = await fetch('../api/organizations')
  //   return result.json()
  // })

  // console.log(data);

  // if (isLoading) {
  //   return <Box>Loading...</Box>
  // }

  return (
    <Container>
      <Heading>Hello!</Heading>
    </Container>
  )
}

InterviewSession.getLayout = function getLayout(page: ReactElement) {
  return (
    <InterviewLayout>
      {page}
    </InterviewLayout>
  )
}

export default InterviewSession;
