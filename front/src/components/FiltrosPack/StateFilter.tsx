import { IBusTour } from '@/interface/IBusTour';

interface RegionFilterProps {
  selectedRegion: string;
  availableStates: string[];
  onFilterRegion: (region: string) => void;
  buses: IBusTour[];
}

const countAllTours = (buses: IBusTour[]) => {
  return buses.length;
};

const RegionFilter: React.FC<RegionFilterProps> = ({
  selectedRegion,
  availableStates,
  onFilterRegion,
  buses,
}) => {
  const nationalStates = availableStates
    .filter((state) =>
      buses.find(
        (tour) => tour.state === state && tour.country === 'Argentina',
      ),
    )
    .sort((a, b) => a.localeCompare(b));

  const internationalStates = availableStates
    .filter((state) =>
      buses.find(
        (tour) => tour.state === state && tour.country !== 'Argentina',
      ),
    )
    .sort((a, b) => a.localeCompare(b));

  const countToursByState = (state: string) => {
    return buses.filter((tour) => tour.state === state).length;
  };

  return (
    <main className="mt-6">
      <section className="max-w-6xl w-full mb-8 ml-5 text-gray-500">
        <h3 className="text-lg font-semibold mb-2">Nacional</h3>
        <ul className="space-y-2">
          {nationalStates.map((state, index) => (
            <li key={index}>
              <button
                className={`${
                  selectedRegion === state && 'font-bold text-blue-500 ml-4'
                }`}
                onClick={() => onFilterRegion(state)}
              >
                {state}{' '}
                <span className="text-gray-400 text-sm">
                  ({countToursByState(state)})
                </span>
              </button>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-6">Internacional</h3>
        <ul className="space-y-2">
          {internationalStates.map((state, index) => (
            <li key={index}>
              <button
                className={`${
                  selectedRegion === state && 'font-bold text-blue-500 ml-4'
                }`}
                onClick={() => onFilterRegion(state)}
              >
                {state} ({countToursByState(state)})
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export { countAllTours };
export default RegionFilter;
