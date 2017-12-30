import { Client } from 'node-rest-client'

function __parseQuery (query) {
  const q = query.trim()
  let queryType
  let out

  if (q.match(/^\d{5}$/) || q.match(/^\d{5}-\d{4}$/)) {
    queryType = 'zip'
  } else if (q.match(/^.+,\s[A-Za-z]\{2}$/)) {
    queryType = 'cityState'
  } else {
    throw new Error('[ERR] Unable to parse location info')
  }

  switch (queryType) {
  case 'zip':
    out = `postal_code=${q}`
    break
  case 'cityState':
    const parts = q.split(',')
    out = `city=${parts[0].trim()}&state=${parts[1].trim()}`
    break
  default:
    throw new Error('[ERR] Unknown query type')
  }

  return out
}

export default function (apiKey) {
  this.apiKey = apiKey

  this.request = (q) => {
    const query = __parseQuery(q)
    const client = new Client()

    return new Promise((resolve, reject) => {
      client.get(`https://api.geocod.io/v1/geocode?api_key=${this.apiKey}&${query}`, function (data, response) {
        resolve(data)
      }).on('error', function (err) {
        reject(new Error('[ERR] Error retrieving geo data', err))
      })
    })
  }
}
