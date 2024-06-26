'use client'
import { useEffect, useState } from 'react';
import { ITravels } from '@/interface/ITravels';
import { TravelDetail } from '@/components/Card-Travel/TravelDetail/TravelDetail';

const DetailTravel = ({ params }: { params: { id: string } }) => {
    const [travel, setTravel] = useState<ITravels | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Data:", data); 
                setTravel(data[0]); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setTravel(null);
            }
        };

        fetchData();
    }, [params.id]);

    if (!travel) {
        return <div>Viaje no encontrada</div>;
    }

    return (
        <div>
            <TravelDetail {...travel} travelId={params.id} />
        </div>
    );
};

export default DetailTravel;
