'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { ChipInput } from '../components/chip'
import { TableCellItemImage } from '../components/image'

const rows: GridRowsProp = [
	{
		id: 1,
		seller: 'Hello',
		itemImage: 'https://placehold.co/64',
		item: 'World',
		itemPrice: 2000,
		category: ['cat1', 'cat2'],
		brand: 'brandddd',
		checkedStatus: true,
	},
	{
		id: 2,
		seller: 'DataGridPro',
		itemImage: 'https://placehold.co/64',
		item: 'is Awesome',
		itemPrice: 2000,
		category: ['cat1', 'cat2'],
		brand: 'brandddd',
		checkedStatus: false,
	},
	{
		id: 3,
		seller: 'MUI',
		itemImage: 'https://placehold.co/64',
		item: 'is Amazing',
		itemPrice: 2000,
		category: ['cat1', 'cat2'],
		brand: 'brandddd',
		checkedStatus: true,
	},
]

const columns: GridColDef[] = [
	{
		field: 'seller',
		headerName: 'セラー',
		width: 240,
		editable: false,
		sortable: false,
	},
	{
		field: 'itemImage',
		headerName: '商品画像',
		width: 100,
		editable: false,
		sortable: false,
		renderCell: TableCellItemImage,
	},
	{
		field: 'item',
		headerName: '商品',
		width: 240,
		editable: false,
		sortable: false,
	},
	{
		field: 'itemPrice',
		headerName: '商品価格',
		width: 240,
		editable: false,
		sortable: false,
	},
	{
		field: 'category',
		headerName: 'カテゴリ',
		width: 240,
		editable: false,
		sortable: false,
	},
	{
		field: 'brand',
		headerName: 'ブランド',
		width: 120,
		editable: false,
		sortable: false,
	},
	{
		field: 'checkedStatus',
		headerName: '確認状態',
		width: 120,
		editable: false,
		sortable: false,
		renderCell: ChipInput,
	},
]

export const SearchResult = () => {
	return (
		<Stack direction="column" gap={2}>
			<Typography fontSize="1.25rem">検索結果</Typography>
			<Stack>
				<DataGrid
					rows={rows}
					columns={columns}
					rowHeight={80}
					checkboxSelection={true}
					disableColumnMenu={true}
					disableRowSelectionOnClick={true}
				/>
			</Stack>
		</Stack>
	)
}
