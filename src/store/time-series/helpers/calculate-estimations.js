export const estimateConfirmedRow = (
  [region, country, lat, lon, ...cData],
  index,
  { filters, deaths },
) => {
  const dRow = deaths.data.find(([dRegion, dCountry]) => {
    return region === dRegion && country === dCountry
  })
  // eslint-disable-next-line no-unused-vars
  const [_dRegion, _dCountry, _dLat, _dLon, ...dData] = dRow

  const { deathRate, timeToDeath } = filters

  let eData = dData.map((column, index) => {
    return Math.round(column / deathRate) || (column === 0 ? 0 : undefined)
  })

  eData = eData.slice(timeToDeath, eData.length)
  if (region) {
    region = `${region} (estimation)`
  } else if (country) {
    country = `${country} (estimation)`
  }

  return [region, country, lat, lon, ...eData]
}

export const estimateConfirmed = (confirmed, deaths, filters) => {
  return {
    ...confirmed,
    data: [
      ...confirmed.data,
      ...confirmed.data.map((data, index) =>
        estimateConfirmedRow(data, index, { filters, deaths }),
      ),
    ],
  }
}

export const calculateEstimations = (datasets, filters) => {
  const [confirmed, deaths, recovered] = datasets

  const confirmedEstimations = estimateConfirmed(confirmed, deaths, filters)

  return [confirmedEstimations, deaths, recovered]
}
