import { useEffect } from "react";
import Swal from "sweetalert2";

const Pagos: React.FC = () => {
  
  
  return (
    <div>
      <p>Movimientos</p>

      <div className="mt-4 flex items-center">
        <p className="font-semibold w-32">Dni:</p>
        <input type="text" className="border border-gray-300 rounded-md p-2 " />
      </div>
      <p className="text-xs mt-2 text-gray-400 ml-32">Ingresa su DNI.</p>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Retirar
        </button>
      </div>
    </div>
  );
};

export default Pagos;
