
import { Suspense, useEffect, useState } from 'react'
import { PrismaClient, Prisma } from "@prisma/client"
import type { ReactElement } from 'react'
import {
  Box,
  Spinner,
} from '@chakra-ui/react';
import Layout from "../../../components/layouts/Layout"
import { useQuery } from 'react-query';

const Studies = () => {
  const { data, isLoading }  = useQuery('studies', async () => {
    const result = await fetch('../api/studies')
    return result.json()
  })

  console.log(data);

  if (isLoading) {
    return <Box h="100vh"><Spinner size="xl" /></Box>
  }

  return (
    <ul>
      {data.map(study => (
        <li key={study.id}>{study.name}</li>
      ))}
    </ul>
  )
}

Studies.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Studies;
