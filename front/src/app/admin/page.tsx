'use client'
import React from 'react'
import CardContact from './CardContact'
import CardUser from './CardUser'
import CardAgency from './CardAgency'
import ImportantAlerts from './ResumenFinanciero'
import CardBox from './CardBox'
import CardTours from './CardTours'
import StatisticsCard from './StatisticsCard'

const minidashboar: React.FC = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Columna izquierda */}
      <div className="flex flex-col space-y-3">
        <CardContact />
        <CardUser  />
        <CardAgency />
        <CardTours />
      </div>
      
      {/* Columna central */}
      <div className="flex flex-col flex-1 space-y-4">
        <ImportantAlerts />
        <StatisticsCard />
       
      </div>
      
      {/* Columna derecha */}
      <div className="flex flex-col space-y-4">
        <CardBox />
      </div>
    </div>
  )
}

export default minidashboar
