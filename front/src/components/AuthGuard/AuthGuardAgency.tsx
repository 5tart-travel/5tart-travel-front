import { checkUserRole } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode, useState } from 'react';

interface AuthGuardAgencyProps {
  children: ReactNode;
}

const AuthGuardAgency = ({ children }: AuthGuardAgencyProps) => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = checkUserRole();
    setRole(userRole);
    if (userRole !== 'agency') {
      router.push('/');
    }
  }, [router]);

  if (role === null) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuardAgency;
