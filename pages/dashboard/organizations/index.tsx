
import { Suspense, useEffect, useState } from 'react'
import { PrismaClient, Prisma } from "@prisma/client"
import type { ReactElement } from 'react'
import {
  Box, Spinner,
} from '@chakra-ui/react';
import Layout from "../../../components/layouts/Layout"
import { useQuery } from 'react-query';

// export async function getServerSideProps() {
//   const prisma = new PrismaClient()
//   const organizations  = await prisma.organization.findMany()

//   return {
//     props : { organizations }
//   }
// }


const Organizations = () => {
  const { data, isLoading }  = useQuery('organizations', async () => {
    const result = await fetch('../api/organizations')
    return result.json()
  })

  console.log(data);

  if (isLoading) {
    return <Spinner size="xl" />
  }

  return (
    <ul>
      {data.map(organization => (
        <li key={organization.id}>{organization.name}</li>
      ))}
    </ul>
  )
}

Organizations.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Organizations;
