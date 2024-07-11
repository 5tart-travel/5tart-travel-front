'use client'
import React from 'react'
import CardContact from './CardContact'
import CardUser from './CardUser'
import CardAgency from './CardAgency'
import TrendGraphs from './TrendGraphs'
import ImportantAlerts from './ResumenFinanciero'
import CardBox from './CardBox'

const minidashboar: React.FC = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Columna izquierda */}
      <div className="flex flex-col space-y-4">
        <CardContact />
        <CardUser />
        <CardAgency />
      </div>
      
      {/* Columna central */}
      <div className="flex flex-col flex-1 space-y-4">
        <ImportantAlerts />
        <TrendGraphs />
      </div>
      
      {/* Columna derecha */}
      <div className="flex flex-col space-y-4">
        <CardBox />
      </div>
    </div>
  )
}

export default minidashboar
