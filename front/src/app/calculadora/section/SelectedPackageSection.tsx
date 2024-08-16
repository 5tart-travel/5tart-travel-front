import { IBusTour } from '@/interface/IBusTour';
import { PiBackpackFill } from 'react-icons/pi';

interface Props {
  selectedPackage: IBusTour | null;
}

const SelectedPackageSection: React.FC<Props> = ({ selectedPackage }) => {
  if (!selectedPackage) {
    return (
      <div className="bg-gray-50 p-5 rounded-xl shadow-2xl">
        <div className="mb-5 rounded-lg">
          <p className="text-center text-gray-700 text-base text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
            <PiBackpackFill className="text-indigo-600 w-10 h-10 " />
            No hay paquete seleccionado
          </p>
        </div>
      </div>
    );
  }

  const startDate = new Date(selectedPackage.fecha_ingreso);
  const endDate = new Date(selectedPackage.fecha_egreso);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const noches = selectedPackage.transportType === 'bus' ? tourDuration - 2 : tourDuration - 1;

  return (
    <div className="bg-gray-50 p-5 rounded-xl shadow-2xl">
      <div
        className="mb-5"
        style={{
          border: '1px solid #f81010',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          backgroundColor: '#e0f7fa',
          backgroundImage: `url(${selectedPackage.imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-center max-w-[160px]">
            <h3 className="text-white bg-black bg-opacity-50 p-1.5 rounded-lg">
              {selectedPackage.title}
              <p className="text-left my-1.5">
                {tourDuration} días, {noches} noches
              </p>
            </h3>
            <div className="mt-2 p-2 bg-blue-950 text-white rounded-lg">
              <p>Precio: ${selectedPackage.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPackageSection;
