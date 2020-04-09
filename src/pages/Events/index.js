import React from 'react'
import './style.sass'

import Map from 'components/Map'
// import Geo from 'services/geo.service'

// class EventsPage extends Component {
// 	async checkGeo(coords) {
// 		const place = await Geo.getAddresByCoords(coords)
// 		this.setState({
// 			place,
// 		})
// 	}
// }

const EventsPage = () => {
	return (
		<section className="events">
			<Map />
		</section>
	)
}

export default EventsPage
