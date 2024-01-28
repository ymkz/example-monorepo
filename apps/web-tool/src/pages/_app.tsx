import '@mantine/core/styles.css'

import { MantineProvider, createTheme } from '@mantine/core'
import { AppProps } from 'next/app'

const theme = createTheme({})

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
