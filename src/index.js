import GeoService from './GeocodioService'
import DarkskyService from './DarkskyService'
import dotenv from 'dotenv'

dotenv.config()

exports.handler = (evt, context, callback) => {
  try {
    const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
    const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY

    const darkskyService = new DarkskyService(DARKSKY_API_KEY)
    const geoService = new GeoService(GEOCODIO_API_KEY)

    const query = evt.query.toString()
    console.log('[WEATHER] Query', query)

    geoService.request(query).then((data) => {
      const location = data.results[0].location
      console.log(`[WEATHER] Getting weather data for ${location.lat}, ${location.lng}`)
      darkskyService.request(location.lat, location.lng).then((data) => {
        console.log('[WEATHER] weather data received')
        const response = {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: data.toString(),
          isBase64Encoded: false,
        }
        callback(null, response)
      }).catch((err) => {
        throw new Error(err)
      })
    }).catch((err) => {
      console.error('[WEATHER]', err)
      const response = {
        'statusCode': 500,
        'headers': { 'Content-Type': 'application/json' },
        body: JSON.stringify(err),
        isBase64Encoded: false,
      }
      callback(null, response)
    })
  } catch (err) {
    console.error('[WEATHER]', err)
    const response = {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(err),
    }

    callback(null, response)
  }
}
