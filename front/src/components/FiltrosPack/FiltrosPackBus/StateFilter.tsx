import { IBusTour } from '@/interface/IBusTour';

interface RegionFilterProps {
  selectedRegion: string;
  availableStates: string[];
  onFilterRegion: (region: string) => void;
  buses: IBusTour[];
}

const StateFilter: React.FC<RegionFilterProps> = ({
  selectedRegion,
  availableStates,
  onFilterRegion,
  buses,
}) => {
  const nationalStates = availableStates.filter((state) =>
    buses.find((tour) => tour.state === state && tour.country === 'Argentina'),
  );
  const internationalStates = availableStates.filter((state) =>
    buses.find((tour) => tour.state === state && tour.country !== 'Argentina'),
  );

  return (
    <section className="max-w-6xl w-full mb-8">
      <h3 className="text-lg font-semibold mb-2">Nacional</h3>
      <ul className="space-y-2">
        {nationalStates.map((state, index) => (
          <li key={index}>
            <button
              className={` hover:underline ${
                selectedRegion === state && 'font-bold'
              }`}
              onClick={() => onFilterRegion(state)}
            >
              {state}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Internacional</h3>
      <ul className="space-y-2">
        {internationalStates.map((state, index) => (
          <li key={index}>
            <button
              className={` hover:underline ${
                selectedRegion === state && 'font-bold'
              }`}
              onClick={() => onFilterRegion(state)}
            >
              {state}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StateFilter;
