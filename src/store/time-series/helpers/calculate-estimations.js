export const estimateRow = (row, _index, args) => {
  if (row[0]) {
    row[0] = `${row[0]} (estimation)`
  } else if (row[1]) {
    row[1] = `${row[1]} (estimation)`
  }

  console.log({ args })

  return row
}

export const estimateDataset = (dataset, _index, args, more) => {
  console.log({ _index, args, more })
  return {
    ...dataset,
    data: [...dataset.data, ...dataset.data.map(estimateRow, args)],
  }
}

export const calculateEstimations = (datasets, filters) => {
  return datasets.map(estimateDataset, [filters, datasets])
}
