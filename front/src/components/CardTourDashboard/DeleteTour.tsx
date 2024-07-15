import React from 'react';
import Swal from 'sweetalert2';

const DeleteTour: React.FC<{
  tourId?: string;
  onDelete: (tourId: string) => void;
}> = ({ tourId, onDelete }) => {
  const handleDeleteClick = async () => {
    if (tourId) {
      const result = await Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este tour?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://fivetart-travel-kafg.onrender.com/tours/${tourId}`,
            {
              method: 'DELETE',
            },
          );

          if (response.ok) {
            console.log('Tour eliminado exitosamente!!');
            Swal.fire(
              'Eliminado!',
              'El tour ha sido eliminado exitosamente.',
              'success',
            );
            onDelete(tourId);
          } else {
            console.error('Error al eliminar el tour:', response.statusText);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el tour.',
              'error',
            );
          }
        } catch (error) {
          console.error('Error al eliminar el tour:', error);
          Swal.fire('Error!', 'Hubo un problema al eliminar el tour.', 'error');
        }
      }
    } else {
      console.error('El tourId es undefined');
    }
  };

  return (
    <button onClick={handleDeleteClick} className="group">
      <svg
        className="rounded-full h-6 w-6 text-white group-hover:bg-blue-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeleteTour;
