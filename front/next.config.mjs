import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  // Configuraciones específicas de Next.js como el manejo de imágenes
  images: {
    domains: [
      'upload.wikimedia.org',
      'res.cloudinary.com',
      's.gravatar.com',
      'cdn.auth0.com',
      'via.placeholder.com',
      'flowbite.com',
      'fivetart-travel.onrender.com',
    ],
  },

  // Variables de entorno que quieres exponer a la aplicación
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Eliminar los console.log en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
