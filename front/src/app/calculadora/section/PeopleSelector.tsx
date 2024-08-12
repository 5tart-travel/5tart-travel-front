import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
import { FaPeopleGroup } from "react-icons/fa6";

interface Props {
  numberOfPeople: number;
  handlePeopleChange: (event: { target: any }) => void;
}

const PeopleSelector: React.FC<Props> = ({ numberOfPeople, handlePeopleChange }) => (
  <div className="bg-violet-50 shadow-inner p-2.5 w-full flex flex-col items-center justify-center rounded-xl">
    <label
      htmlFor="people-count"
      className="mb-2 text-lg font-semibold text-center text-gray-700 text-shadow-medium flex items-center justify-center"
    >
      <FaPeopleGroup className="mr-2 w-8 h-8 text-cyan-500 " />
      Cantidad de Personas
    </label>
    <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden bg-gray-100 w-full">
      <button
        onClick={() =>
          handlePeopleChange({
            target: { value: Math.max(numberOfPeople - 1, 1) },
          })
        }
        className="bg-blue-950 hover:bg-blue-900 rounded-l-2xl border-none text-white text-base p-2.5 cursor-pointer transition-colors duration-300 flex-shrink-0"
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <input
        type="number"
        id="people-count"
        min="1"
        value={numberOfPeople}
        onChange={handlePeopleChange}
        className="flex-1 text-center border-none outline-none text-base p-2.5 bg-gray-50 shadow-inner"
      />

      <button
        onClick={() =>
          handlePeopleChange({
            target: { value: numberOfPeople + 1 },
          })
        }
        className="bg-blue-950 hover:bg-blue-900 border-none text-white text-base p-2.5 cursor-pointer transition-colors duration-300 rounded-r-2xl flex-shrink-0"
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  </div>
);

export default PeopleSelector;
