import React from 'react';
import { IToursDashboard } from './CardTourDashboard';

interface Props {
  editedTour: IToursDashboard;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSaveChanges: () => void;
  handleModalClose: () => void;
}

const EditTour: React.FC<Props> = ({
  editedTour,
  handleInputChange,
  handleSaveChanges,
  handleModalClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-4 max-w-xs w-full">
        <div className="h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Editar Tour</h2>
          <div className="mb-2">
            <label htmlFor="title" className="block text-xs text-gray-600">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={editedTour.title}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mb-2 rounded-lg w-full"
            />
          </div>

          <div className="flex justify-between">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={handleSaveChanges}
            >
              Guardar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={handleModalClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTour;
