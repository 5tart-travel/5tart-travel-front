'use client'
import withAuth from "@/HOC/withAuth";
import ModalFormularioTravel from "@/components/Agencias/AñadirAgencia/ModalPostTravel";
import ModalFilter from "@/components/Agencias/FiltroAgencia/ModalFilterAgencias";
import ListaAgencias from "@/components/Agencias/ListaAgencias";
import { IAgencias } from "@/interface/IAgencias";
import { ITravels } from "@/interface/ITravels";
import { Suspense, useEffect, useState } from "react";



const Agencia = () => {
  const [agencias, setAgencias] = useState<IAgencias[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addTravelModalVisible, setAddTravelModalVisible] = useState(false);
  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [filtroZona, setFiltroZona] = useState('');
  const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState<string[]>([]);
  const [zonasDisponibles, setZonasDisponibles] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://huellasdesperanza.onrender.com/shelters')
      .then(response => response.json())
      .then((data: IAgencias[]) => {
        setAgencias(data);
        const ubicaciones = Array.from(new Set(data.map(agencia => agencia.location)));
        const zonas = Array.from(new Set(data.map(agencia => agencia.zona)));
        setUbicacionesDisponibles(ubicaciones);
        setZonasDisponibles(zonas);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const handleFilter = (ubicacion: string, zona: string) => {
    setFiltroUbicacion(ubicacion);
    setFiltroZona(zona);
    setFilterModalVisible(false);
  };

  const handleOpenAddTravelModal = () => {
    setAddTravelModalVisible(true);
  };

  const handleCloseAddTravelModal = () => {
    setAddTravelModalVisible(false);
  };

  const handleAddTravel = (travel: ITravels) => {
  };

  const filtrarAgencias = () => {
    return agencias.filter(agencia => {
      const ubicacionCoincide = filtroUbicacion ? agencia.location.toLowerCase().includes(filtroUbicacion.toLowerCase()) : true;
      const zonaCoincide = filtroZona ? agencia.zona.toLowerCase().includes(filtroZona.toLowerCase()) : true;
      return ubicacionCoincide && zonaCoincide;
    });
  };
  const filteredAgencias = filtrarAgencias();


  return (
    <main className='bg-gray-50 flex flex-col items-center  '>
      <div className="flex justify-center space-x-2  ">
        <button onClick={handleOpenFilterModal} className="mt-3 text-white bg-lime500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
          Filtrar Agencias
        </button>
        {/* <button onClick={handleOpenAddMascotaModal} className="mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Añadir Mascota
        </button> */}
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        {filteredAgencias.length > 0 ? (
      <ListaAgencias agencias={filtrarAgencias()} />
    ) : (
          <div>No se encontraron agencias con los filtros seleccionados</div>
        )}
      </Suspense>


      <ModalFilter
        isOpen={filterModalVisible}
        onClose={handleCloseFilterModal}
        onFilter={handleFilter}
        ubicaciones={ubicacionesDisponibles}
        zonas={zonasDisponibles}
      />

      <ModalFormularioTravel
        isOpen={addTravelModalVisible}
        onClose={handleCloseAddTravelModal}
        onAddTravel={handleAddTravel}
      />
      
    </main>
  );
};

export default withAuth(Agencia);
