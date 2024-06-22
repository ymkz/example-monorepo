'use client'

import IconClear from '@mui/icons-material/Clear'
import IconSearch from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { search } from '../features/actions'
import { SortOrderItems } from '../features/constants'
import { SearchCategory } from './search-category'

export const SearchForm = () => {
	const [query, setQuery] = useQueryState('query', parseAsString)
	const [sellerCode, setSellerCode] = useQueryState('sellerCode', parseAsString)
	const [itemCode, setItemCode] = useQueryState('itemCode', parseAsString)
	const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString)
	const [categoryInclude, setCategoryInclude] = useQueryState('categoryInclude', parseAsArrayOf(parseAsString))

	const handleReset = () => {
		setQuery(null)
		setSellerCode(null)
		setItemCode(null)
		setSortOrder(null)
		setCategoryInclude(null)
	}

	return (
		<Stack direction="column" gap={2} component="form" action={search}>
			<Stack direction="row" alignItems="center" gap={1}>
				<Typography fontSize="1.25rem">検索条件</Typography>
				<IconButton onClick={handleReset}>
					<IconClear />
				</IconButton>
			</Stack>
			<Stack direction="column" gap={2}>
				<Stack direction="row" gap={2}>
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel htmlFor="query">フリーワード</InputLabel>
						<OutlinedInput
							label="フリーワード"
							name="query"
							id="query"
							value={query || ''}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</FormControl>
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel htmlFor="sellerCode">セラーコード</InputLabel>
						<OutlinedInput
							label="セラーコード"
							name="sellerCode"
							id="sellerCode"
							value={sellerCode || ''}
							onChange={(e) => setSellerCode(e.target.value)}
						/>
					</FormControl>
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel htmlFor="itemCode">商品コード</InputLabel>
						<OutlinedInput
							label="商品コード"
							name="itemCode"
							id="itemCode"
							value={itemCode || ''}
							onChange={(e) => setItemCode(e.target.value)}
						/>
					</FormControl>
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel>並び順</InputLabel>
						<Select
							label="並び順"
							name="sorOorder"
							defaultValue="recommend"
							value={sortOrder || 'recommend'}
							onChange={(e) => setSortOrder(e.target.value)}
						>
							{SortOrderItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
				<SearchCategory name="categoryInclude" category={categoryInclude} setCategory={setCategoryInclude} />
				<Stack alignItems="center" gap={2}>
					<Button type="submit" variant="contained" endIcon={<IconSearch />} size="large" sx={{ width: 240 }}>
						検索
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}
