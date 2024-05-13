import { AppShell } from '@mantine/core'
import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<AppShell header={{ height: 60 }} footer={{ height: 40 }} padding="md">
			<AppShell.Header>
				<div>Logo</div>
			</AppShell.Header>
			<AppShell.Main>{children}</AppShell.Main>
			<AppShell.Footer>footer</AppShell.Footer>
		</AppShell>
	)
}
