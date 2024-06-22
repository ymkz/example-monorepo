import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const Header = () => {
	return (
		<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #ddd' }}>
			<Toolbar>
				<Typography variant="h5" fontWeight={700} component="p">
					ツール
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
