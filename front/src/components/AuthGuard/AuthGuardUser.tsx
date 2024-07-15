import { checkUserRole } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardUserProps {
  children: ReactNode;
}

const AuthGuardUser = ({ children }: AuthGuardUserProps) => {
  const router = useRouter();
  const role = checkUserRole();

  useEffect(() => {
    if (role !== 'user') {
      router.push('/');
    }
  }, [role, router]);

  return <>{children}</>;
};

export default AuthGuardUser;
