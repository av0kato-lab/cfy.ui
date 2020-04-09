import React, { useState } from 'react'
import classNames from 'classnames'
import './style.sass'
import Loader from 'components/Loader'
import { YMaps, Map as YMap, YMapsApi } from 'react-yandex-maps'
import { requset } from 'services/geocoder'

const setZoom = (map: any, zoom: number) => {
	map.setZoom(map.getZoom() + zoom, {
		duration: 200,
	})
}

const Map: React.FC<{
	lat: number
	lng: number
	zoom: number
}> = ({ lat = 55.75322293, lng = 37.62249357, zoom = 12 }) => {
	const [map, setMap] = useState<YMapsApi | null>(null)

	return (
		<section
			className={classNames('map', {
				'map--load': !map,
			})}
		>
			{!map && <Loader />}
			<YMaps>
				<YMap
					width="100%"
					height="100%"
					defaultState={{
						center: [lat, lng],
						zoom,
					}}
					// onLoad={setMap}
					instanceRef={setMap}
				/>
			</YMaps>
			<div className="map__panel">
				<input
					name="search"
					type="text"
					onBlur={async (evt: React.ChangeEvent<HTMLInputElement>) => {
						const data = await requset(evt.target.value)
						console.log(data)
					}}
				/>
				<button onClick={() => setZoom(map, 1)}>Zoom in</button>
				<button onClick={() => setZoom(map, -1)}>Zoom out</button>
			</div>
		</section>
	)
}

export default Map
