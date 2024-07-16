import { checkUserRole } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode, useState } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuardAdmin = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = checkUserRole();
    setRole(userRole);
    if (userRole !== 'admin') {
      router.push('/');
    }
  }, [router]);

  if (role === null) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuardAdmin;
