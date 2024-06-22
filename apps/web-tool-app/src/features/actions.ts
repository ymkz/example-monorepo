'use server'

export const search = async (formData: FormData) => {
	console.log('[actions search] formData:', formData)
	const query = formData.get('query')
	const sellerId = formData.get('seller_id')
	const srid = formData.get('item_code')
	const sortOrder = formData.get('sort_order')
	const categoryInclude1 = formData.getAll('cat1').filter(Boolean)
	console.log('[actions data]:', {
		query,
		sellerId,
		srid,
		sortOrder,
		categoryInclude1,
	})
}
