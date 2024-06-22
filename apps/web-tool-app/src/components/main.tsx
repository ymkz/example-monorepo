import Box from '@mui/material/Box'

type Props = {
	children: React.ReactNode
}

export const Main = (props: Props) => {
	return (
		<Box component="main" bgcolor="hsla(215, 15%, 97%, 0.5)" flexGrow={1} padding={4}>
			{props.children}
		</Box>
	)
}
