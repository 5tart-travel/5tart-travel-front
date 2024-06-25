

import React from 'react';
import CardRefuge from './CardAgencia';
import { IAgencias } from '@/interface/IAgencias';

interface ListaAgenciasProps {
  agencias: IAgencias[];
}

const ListaAgencias: React.FC<ListaAgenciasProps> = ({ agencias }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {agencias.map((agencia, index) => (
        <CardRefuge key={index} agencia={agencia} />
      ))}
    </div>
  );
};

export default ListaAgencias;
