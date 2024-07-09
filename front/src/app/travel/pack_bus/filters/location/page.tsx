import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tour {
  state: string;
}

interface LocationProps {
  setSelectedLocation: (location: string | null) => void;
}

const Location: React.FC<LocationProps> = ({ setSelectedLocation }) => {
  const [locations, setLocations] = useState<
    { state: string; count: number }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fivetart-travel-kafg.onrender.com/filter')
      .then((response) => response.json())
      .then((data: Tour[]) => {
        const locationCounts = data.reduce(
          (acc: { [key: string]: number }, tour: Tour) => {
            acc[tour.state] = (acc[tour.state] || 0) + 1;
            return acc;
          },
          {},
        );

        const uniqueLocations = Object.keys(locationCounts).map((state) => ({
          state,
          count: locationCounts[state],
        }));

        uniqueLocations.sort((a, b) => a.state.localeCompare(b.state));
        setLocations(uniqueLocations);
      })
      .catch((error) => {
        console.error('Error fetching the tours data:', error);
      });
  }, []);

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="p-4">
      <div className="space-y-3">
        {locations.map((location) => (
          <div
            key={location.state}
            onClick={() => handleLocationClick(location.state)}
            className="text-left text-sm text-gray-800 cursor-pointer"
          >
            {location.state}{' '}
            <span className="text-gray-400">({location.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
