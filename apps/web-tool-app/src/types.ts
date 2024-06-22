type Params = {
	[key: string]: string
}
type SearchParams = {
	[key: string]: string | string[] | undefined
}
export type PageProps<P extends Params, S extends SearchParams> = {
	params: P
	searchParams: S
}
