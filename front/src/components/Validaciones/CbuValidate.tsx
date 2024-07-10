export interface IValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const CbuValidate = (cbu: string): IValidationResult => {
  if (cbu.length !== 22) {
    return {
      isValid: false,
      errorMessage: 'El CBU debe tener exactamente 22 dígitos.',
    };
  }

  if (!/^\d{22}$/.test(cbu)) {
    return {
      isValid: false,
      errorMessage: 'El CBU solo puede contener números.',
    };
  }

  const calculateCheckDigit = (number: string, weights: number[]): number => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
      sum += parseInt(number[i], 10) * weights[i];
    }
    return (10 - (sum % 10)) % 10;
  };

  const bankSection = cbu.slice(0, 8);
  const accountSection = cbu.slice(8, 22);

  const bankWeights = [7, 1, 3, 9, 7, 1, 3];
  const accountWeights = [3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3];

  const bankCheckDigit = calculateCheckDigit(
    bankSection.slice(0, 7),
    bankWeights,
  );
  const accountCheckDigit = calculateCheckDigit(
    accountSection.slice(0, 13),
    accountWeights,
  );

  if (bankCheckDigit !== parseInt(bankSection[7], 10)) {
    return {
      isValid: false,
      errorMessage: 'El dígito de control del banco es inválido.',
    };
  }

  if (accountCheckDigit !== parseInt(accountSection[13], 10)) {
    return {
      isValid: false,
      errorMessage: 'El dígito de control de la cuenta es inválido.',
    };
  }

  return { isValid: true };
};

export default CbuValidate;
