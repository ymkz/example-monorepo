import { Button } from '@mantine/core'
import type { GetServerSideProps } from 'next'
import { Layout } from '../components/layout'
import { NextHead } from '../components/next'
import { incrementErrorCounter } from '../utils/metrics'

export const getServerSideProps: GetServerSideProps = async () => {
	incrementErrorCounter('other')
	return { props: {} }
}

export default function Page() {
	return (
		<>
			<NextHead>
				<title>Monorepo</title>
			</NextHead>
			<Layout>
				<Button>送信</Button>
			</Layout>
		</>
	)
}
