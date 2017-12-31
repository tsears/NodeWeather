import GeoService from './GeocodioService'
import dotenv from 'dotenv'

dotenv.config()

exports.handler = (evt, context, callback) => {
  try {
    // const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
    const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY
    const geoService = new GeoService(GEOCODIO_API_KEY)

    const query = evt.query.toString()
    console.log('[WEATHER] Query', query)

    geoService.request(query).then((data) => {
      const response = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        isBase64Encoded: false,
      }
      callback(null, response)
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
