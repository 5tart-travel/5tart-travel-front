import { checkUserRole } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardAdminProps {
  children: ReactNode;
}

const AuthGuardAdmin = ({ children }: AuthGuardAdminProps) => {
  const router = useRouter();
  const role = checkUserRole();

  useEffect(() => {
    if (role !== 'agency') {
      router.push('/');
    }
  }, [role, router]);

  return <>{children}</>;
};

export default AuthGuardAdmin;
