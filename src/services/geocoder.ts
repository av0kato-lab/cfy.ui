import { GeocoderResponce } from './geocoder.type'

export const url = (text: string) => `
	https://geocode-maps.yandex.ru/1.x
	?apikey=a62d0fde-d2db-4670-be8a-1eb3f86436d8
	&format=json
	&geocode=${text}
`

export const requset = async (
	text: string
): Promise<GeocoderResponce | number | undefined> => {
	try {
		const response = await fetch(url(text), {
			method: 'GET',
		})

		if (response.ok) {
			return response.json()
		}

		return response.status
	} catch (err) {
		console.log(err.message)
	}
}

export const send = () => {
	return requset
}
