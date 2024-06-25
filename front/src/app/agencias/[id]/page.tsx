'use client'
import AgenciaDetail from '@/components/AgenciaDetail/AgenciaDetail';
import AgenciaGeolocation from '@/components/Maps/ShelterGeolocation';
import { IAgencias } from '@/interface/IAgencias';
import { getAgenciaById } from '@/utils/refugios';
import { useState, useEffect } from 'react';

const DetailTravel = ({ params }: { params: { id: string } }) => {
    const [refugio, setRefugio] = useState<IAgencias | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencia = async () => {
            try {
                const data = await getAgenciaById(params.id);
                if (data) {
                    setRefugio(data);
                } else {
                    setError('Agencia no encontrado');
                }
            } catch (error) {
                setError('Error al obtener el refugio');
                console.error('Error en fetchRefugio:', error);
            }
        };

        fetchAgencia();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!agencia) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <AgenciaDetail {...agencia} />
            <AgenciaGeolocation id={params.id} /> 
        </div>
    );
};

export default DetailTravel;
