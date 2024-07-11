'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const Contador = ({ quantity, onQuantityChange }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    const newCount = count + value;
    if (newCount < 1 || newCount > 5) return;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 text-center">{count}</span>

      <button onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};

export default Contador;
