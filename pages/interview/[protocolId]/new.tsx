// This should create a new session, and then redirect to /sessionId

import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import InterviewLayout from "../../../components/layouts/Interview"
import { useQuery } from 'react-query';
import { Container, Heading, Spinner } from '@chakra-ui/react';

export default function NewInterviewSession() {
  const router = useRouter();
  const { protocolId } = router.query;

  useEffect(() => {
    setTimeout(() => {
      router.push(`/interview/${protocolId}/sessionId`)
    }, 2000)
  }, [router, protocolId])

  console.log(protocolId);
  return (
      <Container>
        <Heading><Spinner />Creating new session...</Heading>
      </Container>
  );
}

NewInterviewSession.getLayout = function getLayout(page: ReactElement) {
  return (
    <InterviewLayout>
      {page}
    </InterviewLayout>
  )
}
