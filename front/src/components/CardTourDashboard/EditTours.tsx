import React from 'react';
import { ITours } from '@/interface/ITours';

interface Props {
  editedTours: ITours;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaveChanges: () => void;
  handleModalClose: () => void;
}

const EditTours: React.FC<Props> = ({
  editedTours,
  handleInputChange,
  handleSelectChange,
  handleSaveChanges,
  handleModalClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-4 max-w-xs w-full">
        <div className="h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Editar Tour</h2>
          <div className="mb-2">
            <label htmlFor="name" className="block text-xs text-gray-600">
              Título
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={editedTours.title}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mb-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="breed" className="block text-xs text-gray-600">
              Precio
            </label>
            <input
              type="number"
              name="breed"
              id="breed"
              value={editedTours.price}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mb-2 rounded-lg w-full"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-xs text-gray-600"
            >
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={editedTours.description}
              onChange={handleInputChange}
              rows={4}
              className="border border-gray-300 p-2 mb-2 rounded-lg w-full resize-none"
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

export default EditTours;
