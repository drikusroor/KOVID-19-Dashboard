import React from 'react'
import { Layout } from '../../components/layout'

export default function () {
  return (
    <Layout title="About this website">
      <p>
        This website has been created for the purpose of making it easier to
        explore and compare COVID-19 data per and between countries.
      </p>
      <p>
        The data used on this website comes from{' '}
        <b>
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            rel="noopener noreferrer"
            target="_blank"
          >
            2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns
            Hopkins CSSE
          </a>
        </b>
        . All credits for collecting the data go to John Hopkins University.
      </p>
    </Layout>
  )
}
