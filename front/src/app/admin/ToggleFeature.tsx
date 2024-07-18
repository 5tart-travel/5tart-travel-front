'use client';
import React, { useState, useEffect } from 'react';

interface ToggleFeatureProps {
  isActive: boolean;
  onToggle: () => void;
}

const ToogleFeature: React.FC<ToggleFeatureProps> = ({ isActive, onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggleChange = async () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    onToggle();
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-9 h-5 rounded-full peer-focus:outline-none peer-focus:ring-4 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:h-4 after:w-4 after:transition-all
          ${isChecked ? 'bg-blue-950 peer-focus:ring-blue-300 after:translate-x-full' : 'bg-gray-400 peer-focus:ring-gray-300 after:translate-x-0'} 
          after:bg-white
        `}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
};

export default ToogleFeature;
