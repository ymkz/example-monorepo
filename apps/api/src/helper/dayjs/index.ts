import dayjs from 'dayjs'

export const convertFromDate = (date: Date, format = 'YYYY-MM-DDTHH:mm:ssZ') => {
	return dayjs(date).format(format)
}
