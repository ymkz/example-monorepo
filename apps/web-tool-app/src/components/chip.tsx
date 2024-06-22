'use client'

import IconDone from '@mui/icons-material/Done'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'

// biome-ignore lint/suspicious/noExplicitAny: default any
type Props = GridRenderCellParams<any, boolean, boolean, GridTreeNodeWithRender>

export const ChipInput = (props: Props) => {
	return (
		<Stack height="100%" justifyContent="center">
			<Chip
				clickable={true}
				label={props.value ? '確認済み' : '未確認'}
				color={props.value ? 'primary' : 'default'}
				icon={props.value ? <IconDone /> : undefined}
			/>
		</Stack>
	)
}
