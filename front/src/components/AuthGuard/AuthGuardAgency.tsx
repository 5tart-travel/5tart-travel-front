import { checkUserRole } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardAgencyProps {
  children: ReactNode;
}

const AuthGuardAgency = ({ children }: AuthGuardAgencyProps) => {
  const router = useRouter();
  const role = checkUserRole();

  useEffect(() => {
    if (role !== 'agency') {
      router.push('/');
    }
  }, [role, router]);

  return <>{children}</>;
};

export default AuthGuardAgency;
