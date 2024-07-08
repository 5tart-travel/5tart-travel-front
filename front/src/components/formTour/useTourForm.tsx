import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ICreateTourDto } from '@/interface/ICreateTourDto';

export const useTourForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [fecha_ingreso, setFecha_ingreso] = useState<Date | null>(null);
  const [fecha_egreso, setFecha_egreso] = useState<Date | null>(null);
  const [destino, setDestino] = useState('');
  const [salida, setSalida] = useState('');
  const [transportType, setTransportType] = useState<string | ''>('');
  const [imgUrl, setImgUrl] = useState('');
  const [hotel, setHotel] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [oferta, setOferta] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userSessionString: any = localStorage.getItem('userSession');
    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);
    }
  }, []);

  const validateDates = (): boolean => {
    const today = new Date();
    if (fecha_ingreso && fecha_ingreso <= today) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la Fecha de Ingreso',
        text: 'La fecha de ingreso debe ser posterior al día de hoy.',
      });
      return false;
    }

    if (fecha_ingreso && fecha_egreso && fecha_egreso <= fecha_ingreso) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la Fecha de Egreso',
        text: 'La fecha de egreso debe ser posterior a la fecha de ingreso.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    if (
      title &&
      price !== null &&
      description &&
      address &&
      transportType &&
      imgUrl
    ) {
      try {
        const nuevoTour: ICreateTourDto = {
          title,
          price,
          description,
          address,
          fecha_ingreso,
          fecha_egreso,
          destino,
          salida,
          transportType,
          hotel,
          empresa,
          imgUrl,
          oferta,
        };

        const tourResponse = await fetch(
          'https://fivetart-travel-kafg.onrender.com/tours',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(nuevoTour),
          },
        );

        if (!tourResponse.ok) {
          const responseText = await tourResponse.text();
          throw new Error('Error al agregar el tour.');
        }

        Swal.fire({
          icon: 'success',
          title: 'Tour agregado correctamente',
        });

        // Limpiar los campos después del éxito
        setTitle('');
        setPrice(null);
        setDescription('');
        setAddress('');
        setFecha_ingreso(null);
        setFecha_egreso(null);
        setDestino('');
        setSalida('');
        setTransportType('');
        setImgUrl('');
        setHotel('');
        setEmpresa('');
        setOferta(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al agregar el tour. Por favor, intente nuevamente.',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos obligatorios.',
      });
    }
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    address,
    setAddress,
    fecha_ingreso,
    setFecha_ingreso,
    fecha_egreso,
    setFecha_egreso,
    destino,
    setDestino,
    salida,
    setSalida,
    transportType,
    setTransportType,
    hotel,
    setHotel,
    empresa,
    setEmpresa,
    oferta,
    setOferta,
    imgUrl,
    setImgUrl,
    token,
    handleSubmit,
  };
};