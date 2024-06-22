'use client'

import Stack from '@mui/material/Stack'
import type { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'

// biome-ignore lint/suspicious/noExplicitAny: default any
type Props = GridRenderCellParams<any, string, string, GridTreeNodeWithRender>

export const TableCellItemImage = (props: Props) => {
	return (
		<Stack height="100%" justifyContent="center">
			<img src={props.value} width={64} height={64} alt="商品画像" />
		</Stack>
	)
}
