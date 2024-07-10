import HomeButton from '@/components/ui/HomeButton';
import '../../../components/Styles/ErrorBus.css';
import Link from 'next/link';


const Page = () => {
    return (
            <div className="container mx-auto p-4 flex justify-center">
                <div className="rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative">
                  <div className="airplane"></div>{' '}
                    <p className='className="flex justify-center text-center text-gray-600 mt-[100px] text-xl font-bold mb-4'>
                        Las agencias no pueden registrarse con google, por favor has click {' '}
                        <Link href="/AUTH/agency_register" className="text-blue-500">
                        aquí
                        </Link>{' '}
                        para hacerlo con nuestro formulario.
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

export default Page