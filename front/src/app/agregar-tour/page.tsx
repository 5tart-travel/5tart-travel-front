'use client';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
import FormularioTour from '@/components/formTour/formTour';

const AgregarTour = () => {
  return (
    <AuthGuardAgency>
      <div>
        <FormularioTour />
      </div>
    </AuthGuardAgency>
  );
};

export default AgregarTour;
