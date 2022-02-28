import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { NextPage } from 'next'
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const queryClient = new QueryClient()
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        { getLayout(<Component {...pageProps} />) }
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
