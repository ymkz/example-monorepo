import { ColorSchemeScript } from '@mantine/core'
import { Head, Html, Main, NextScript } from 'next/document'

export default function CustomDocument() {
  return (
    <Html lang="ja">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
