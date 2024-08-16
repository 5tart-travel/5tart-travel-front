'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ToogleFeature from '../ToggleFeature';

const initialFeatures = [
  {
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1721265583/luna_vt1wu0.jpg',
    title: 'Modo Oscuro',
    description: 'Lanzamiento | 24-09-24',
    version: 'v1.2',
    isActive: false,
  },
  {
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1721265659/musica_fmtv2v.jpg',
    title: 'Musica',
    description: 'Lanzamiento | 10-09-24',
    version: 'v1.6',
    isActive: false,
  }
];

const Beta = () => {
  const [newFeatures, setNewFeatures] = useState(initialFeatures);

  useEffect(() => {
    const savedFeatures = localStorage.getItem('newFeatures');
    if (savedFeatures) {
      setNewFeatures(JSON.parse(savedFeatures));
    }
  }, []);

  const handleToggleFeature = (index: number) => {
    const updatedFeatures = newFeatures.map((feature, i) =>
      i === index ? { ...feature, isActive: !feature.isActive } : feature
    );
    setNewFeatures(updatedFeatures);
    localStorage.setItem('newFeatures', JSON.stringify(updatedFeatures));
  };

  return (
    <>
      {newFeatures.map((feature, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-all hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gray-400 rounded-full overflow-hidden ${feature.isActive ? '' : 'grayscale'}`}>
              <Image
                src={feature.imgUrl}
                alt="Feature"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div className="flex-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr 1.2fr', gridGap: '40px'}}>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              <p className="text-gray-600">{feature.version}</p>
              <p className={`text-m font-medium ${feature.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {feature.isActive ? 'Activo' : 'Inactivo'}
              </p>
            </div>
            <ToogleFeature
              isActive={feature.isActive}
              onToggle={() => handleToggleFeature(i)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Beta;
