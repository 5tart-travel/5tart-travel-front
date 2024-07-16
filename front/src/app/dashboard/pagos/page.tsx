import DeleteOrders from '@/components/Dashboard/DeleteOrders';
import TotalMount from '@/components/Dashboard/TotalMount';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Pagos: React.FC = () => {
  return (
    <div className="mt-5">
      <TotalMount />
      <DeleteOrders />
    </div>
  );
};

export default Pagos;
