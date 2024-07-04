import axios from "axios";

const handleCheckout = async () => {
    try {
      const response = await axios.post('https://huellasdesperanza.onrender.com/mercado-pago', {
        title: 'Monto total de la Donacion',
        price: Number(total),
      });
      const data = response.data;

      if (data) {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        script.onload = () => {
          const mp = new window.MercadoPago('TEST-5423250e-6e54-4e3b-a21b-160a1653fc7a', {
            locale: 'es-AR',
          });
          mp.checkout({
            preference: {
              id: data
            },
            autoOpen: true,
          });
        };
        document.body.appendChild(script);
      } else {
        alert('Error al crear la preferencia de pago');
      }

    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      alert('Error al crear la preferencia de pago');
    }
  };
  