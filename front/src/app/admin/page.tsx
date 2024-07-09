'use client'
import React from 'react'
import CardContact from './CardContact'
import CardUser from './CardUser'
import CardAgency from './CardAgency'
import TrendGraphs from './TrendGraphs'
import ImportantAlerts from './ImportantAlerts'
import CardBox from './CardBox'

const minidashboar = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 md:p-0 md:gap-6">
        <CardContact />
        <CardUser />
        <CardAgency />
        <CardBox />
      </div>
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="lg:col-span-1 lg:row-span-2 h-96">
          <ImportantAlerts />
        </div>
        <div className="md:col-span-2">
          <TrendGraphs />
        </div>
      </div>
    </div>
  )
}

export default minidashboar
