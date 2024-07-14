import HomeButton from '@/components/ui/HomeButton';
import '../../../components/Styles/ErrorBus.css';
import Link from 'next/link';


const errorInactiveAccount = () => {
    return (
            <div className="container mx-auto p-4 flex justify-center">
                <div className="rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative">
                  <div className="airplane"></div>{' '}
                    <p className='className="flex justify-center text-center text-gray-600 mt-[100px] text-xl font-bold mb-4'>
                        Esta cuenta fue desactivada por un administrador, si crees que se trata de un error o si cambiaste de decision y quieres solicitar la reactivacion de la misma haz click {' '}
                        <Link href="/contacto" className="text-blue-500">
                        aquí
                        </Link>{' '}
                        para ir al formulario de contacto, el admin revisara tu solicitud y se te informara de la decision en un plazo de 48hs.
                    </p>
                        <br />
                        <br />
                        <div className="flex justify-center">
                        <HomeButton />
                    </div>
                </div>
              </div>
    )
}

export default errorInactiveAccount