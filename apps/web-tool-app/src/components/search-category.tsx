'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

type Props = {
	name: string
	category: string[] | null
	setCategory: (category: string[] | ((prev: string[] | null) => string[] | null) | null) => Promise<URLSearchParams>
}

export const SearchCategory = (props: Props) => {
	return (
		<Stack direction="row" gap={2}>
			<FormControl variant="outlined" sx={{ minWidth: 240 }}>
				<InputLabel>カテゴリ1層</InputLabel>
				<Select
					label="カテゴリ1層"
					name={props.name}
					value={props.category?.at(0) || ''}
					onChange={(e) => {
						props.setCategory([e.target.value].flat())
					}}
				>
					<MenuItem value="">指定なし</MenuItem>
					<MenuItem value="10">Ten</MenuItem>
					<MenuItem value="20">Twenty</MenuItem>
					<MenuItem value="30">Thirty</MenuItem>
				</Select>
			</FormControl>
			<FormControl disabled={!props.category?.at(0)} variant="outlined" sx={{ minWidth: 240 }}>
				<InputLabel>カテゴリ2層</InputLabel>
				<Select
					label="カテゴリ2層"
					name={props.name}
					value={props.category?.at(1) || ''}
					onChange={(e) => {
						// @ts-ignore
						props.setCategory([props.category?.at(0), e.target.value].flat())
					}}
				>
					<MenuItem value="">指定なし</MenuItem>
					<MenuItem value="10">Ten</MenuItem>
					<MenuItem value="20">Twenty</MenuItem>
					<MenuItem value="30">Thirty</MenuItem>
				</Select>
			</FormControl>
			<FormControl disabled={!props.category?.at(1)} variant="outlined" sx={{ minWidth: 240 }}>
				<InputLabel>カテゴリ3層</InputLabel>
				<Select
					label="カテゴリ3層"
					name={props.name}
					value={props.category?.at(2) || ''}
					onChange={(e) => {
						// @ts-ignore
						props.setCategory([props.category?.at(0), props.category?.at(1), e.target.value].flat())
					}}
				>
					<MenuItem value="">指定なし</MenuItem>
					<MenuItem value="10">Ten</MenuItem>
					<MenuItem value="20">Twenty</MenuItem>
					<MenuItem value="30">Thirty</MenuItem>
				</Select>
			</FormControl>
			<FormControl disabled={!props.category?.at(2)} variant="outlined" sx={{ minWidth: 240 }}>
				<InputLabel>カテゴリ4層</InputLabel>
				<Select
					label="カテゴリ4層"
					name={props.name}
					value={props.category?.at(3) || ''}
					onChange={(e) => {
						// @ts-ignore
						props.setCategory([props.category, e.target.value].flat())
					}}
				>
					<MenuItem value="">指定なし</MenuItem>
					<MenuItem value="10">Ten</MenuItem>
					<MenuItem value="20">Twenty</MenuItem>
					<MenuItem value="30">Thirty</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	)
}
