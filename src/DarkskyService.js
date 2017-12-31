import { Client } from 'node-rest-client'

export default function (apiKey) {
  this.apiKey = apiKey

  this.request = (lat, long) => {
    const client = new Client({
      mimetypes: {
        json: ['application/json', 'application/json; charset=utf-8'],
      },
    })

    return new Promise((resolve, reject) => {
      client.get(
        `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`,
        (data) => {
          resolve(data)
        }
      ).on('error', (err) => {
        reject(new Error('[ERR] Error retrieving weather data', err))
      })
    })
  }
}
