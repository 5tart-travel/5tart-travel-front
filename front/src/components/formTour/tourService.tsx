import { ICreateTourDto } from '@/interface/ICreateTourDto';

export const addNewTour = async (
  tourData: ICreateTourDto,
  token: string | null,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tours`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tourData),
    },
  );

  if (!response.ok) {
    const responseText = await response.text();
    console.error('Respuesta del servidor:', responseText);
    throw new Error('Error al agregar el tour.');
  }
};
