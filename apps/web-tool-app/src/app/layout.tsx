import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material/styles'
import type { Metadata } from 'next'
import { Header } from '../components/header'
import { Main } from '../components/main'
import { theme } from '../theme'

export const metadata: Metadata = {
	title: {
		default: 'ツール',
		template: '%s - ツール',
	},
	robots: {
		index: false,
	},
}

type Props = {
	children: React.ReactNode
}

export default function IndexLayout(props: Props) {
	return (
		<html lang="ja">
			<body>
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Stack height="100vh">
							<Header />
							<Main>{props.children}</Main>
						</Stack>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
