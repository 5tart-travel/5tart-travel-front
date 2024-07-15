'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import Link from 'next/link';
import CardTourDashboard, {
  IToursDashboard,
} from '@/components/CardTourDashboard/CardTourDashboard';
import EditTour from '@/components/CardTourDashboard/EditTour';
import Swal from 'sweetalert2';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';

const MisTours = () => {
  const [tours, setTours] = useState<IToursDashboard[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<IToursDashboard | null>(
    null,
  );
  const [editedTour, setEditedTour] = useState<IToursDashboard | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userSessionString: any = localStorage.getItem('userSession');

    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);

      if (ntoken) {
        const decoded: any = decodeJwt(ntoken);
        const agencyId = decoded.id;
        setAgencyId(agencyId);
      }
    }
  }, []);

  useEffect(() => {
    if (token && agencyId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${agencyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.tours)) {
            setTours(data.tours);
          } else {
            setTours([]);
            console.error(
              'La respuesta de la API no contiene un array de tours',
            );
          }
        })
        .catch((error) => {
          setTours([]);
          console.error('Error al obtener los tours:', error);
        });
    }
  }, [token, agencyId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editedTour) {
      setEditedTour({ ...editedTour, [e.target.name]: e.target.value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editedTour && editedTour.id && token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours/${editedTour.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTour),
          },
        );

        if (response.ok) {
          const data = await response.json();
          setTours(tours.map((tour) => (tour.id === data.id ? data : tour)));
          setSelectedTour(null);
          setEditedTour(null);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const handleModalClose = () => {
    setSelectedTour(null);
    setEditedTour(null);
  };

  const handleDeleteTour = (tourId: string) => {
    setTours(tours.filter((tour) => tour.id !== tourId));
  };

  return (
    <AuthGuardAgency>
      <div className="p-6">
        {Array.isArray(tours) && tours.length === 0 ? (
          <div className="text-center">
            <p>
              Aún no tienes tours, has click{' '}
              <Link href="/dashboard/agregar-tour" className="text-blue-500">
                aquí
              </Link>{' '}
              para crear uno.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <CardTourDashboard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                price={tour.price}
                imgUrl={tour.imgUrl}
                oferta={tour.oferta}
                updateTour={(updatedTour) =>
                  setTours(
                    tours.map((t) =>
                      t.id === updatedTour.id ? updatedTour : t,
                    ),
                  )
                }
                deleteTour={handleDeleteTour}
              />
            ))}
          </div>
        )}
        {selectedTour && editedTour && (
          <EditTour
            editedTour={editedTour}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleModalClose={handleModalClose}
          />
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default MisTours;
