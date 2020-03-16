import Papa from 'papaparse'

export default async url => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/CSV',
    },
  })

  const reader = response.body.getReader()
  const result = await reader.read() // raw array
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value) // the csv text
  const results = Papa.parse(csv, { header: false }) // object with { data, errors, meta }
  const rows = results.data // array of objects
  return rows
}
