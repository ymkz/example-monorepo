import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { SearchForm } from '../components/search-form'
import { SearchResult } from '../components/search-result'
import type { PageProps } from '../types'

type SearchParams = {
	query?: string
	seller_id?: string
	item_code?: string
	sort_order?: string
	cat1?: string
}

export default function IndexPage(props: PageProps<never, SearchParams>) {
	console.log('[IndexPage] searchParams:', props.searchParams)
	return (
		<Container maxWidth="xl">
			<Stack direction="column" gap={4}>
				<SearchForm />
				<SearchResult />
			</Stack>
		</Container>
	)
}
