'use client'
import React from 'react'
import CardContact from './CardContact'
import CardUser from './CardUser'
import CardAgency from './CardAgency'
import TrendGraphs from './TrendGraphs'
import ImportantAlerts from './ImportantAlerts'

const minidashboar = () => {
  return (
    <div className="p-4">
    <div className="grid grid-cols-1  md:grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4
      p-6 md:p-0 md:gap-6 " >
      <CardContact />
      <CardUser />
      <CardAgency />
     <ImportantAlerts />
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
     <TrendGraphs />
   </div>
   </div>
  )
}

export default minidashboar