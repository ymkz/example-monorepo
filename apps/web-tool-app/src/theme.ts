'use client'

import { createTheme } from '@mui/material/styles'
import type {} from '@mui/x-data-grid/themeAugmentation'

export const theme = createTheme({
	palette: {
		mode: 'light',
	},
	components: {
		MuiDataGrid: {
			styleOverrides: {
				root: {
					backgroundColor: '#fff',
				},
				cell: {
					':focus-within': {
						outline: 0,
					},
				},
				columnHeader: {
					':focus-within': {
						outline: 0,
					},
				},
			},
		},
	},
})
