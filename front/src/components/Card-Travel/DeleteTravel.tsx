
import React from 'react';
import Swal from 'sweetalert2';

const DeleteTravel: React.FC<{ travelId?: string, onDelete: (travelId: string) => void }> = ({ travelId, onDelete }) => {
  const handleDeleteClick = async () => {
    if (travelId) {
      const result = await Swal.fire({
        title: '¿Estás seguro de que quieres eliminar esta mascota?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarla!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://huellasdesperanza.onrender.com/pets/delete/${travelId}`,
            {
              method: "POST",
            }
          );

          if (response.ok) {
            console.log("Mascota eliminada exitosamente!!");
            Swal.fire(
              'Eliminada!',
              'La mascota ha sido eliminada exitosamente.',
              'success'
            );
            onDelete(travelId); 
          } else {
            console.error(
              "Error al eliminar la mascota:",
              response.statusText
            );
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la mascota.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error al eliminar la mascota:", error);
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar la mascota.',
            'error'
          );
        }
      }
    } else {
      console.error("La mascotaId es undefined");
    }
  };

  return (
    <button onClick={handleDeleteClick} className="group">
      <svg
        className="rounded-full h-6 w-6 text-lime500 group-hover:bg-lime-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  );
};

export default DeleteTravel;
