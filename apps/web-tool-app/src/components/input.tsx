import IconClear from '@mui/icons-material/Clear'
import IconSearch from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import type { SelectProps } from '@mui/material/Select'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export type SelectInputItem = {
	label: string
	value: string
}

type SelectInputProps = SelectProps & {
	items: SelectInputItem[]
}

export const SelectInput = (props: SelectInputProps) => {
	const { items, ...selectProps } = props
	return (
		<FormControl sx={{ minWidth: 240 }}>
			<InputLabel>{selectProps.label}</InputLabel>
			<Select {...selectProps}>
				{items.map((item) => (
					<MenuItem key={item.value} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
