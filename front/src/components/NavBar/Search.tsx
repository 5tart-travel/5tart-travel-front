import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Modal from "@/components/modal_search/modal_search";
import Image from "next/image";
import Link from 'next/link';
import LoadingSpinner from "@/components/LoadingSniper/LoadingSniper";
import { MdOutlinePets } from "react-icons/md";
import hardcodedResults from "@/utils/harcodedResults";
import { ISearch } from "@/interface/ISearch";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ISearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setIsModalOpen(true);
    console.log("Searching for:", searchTerm);

    const filteredResults = hardcodedResults.filter(result =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.transportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.empresa.toLowerCase().includes(searchTerm.toLowerCase())  ||
      result.agency.name_agency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hidden lg:flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar"
          className="flex-grow px-2 text-gray-700 focus:outline-none rounded-l-3xl border-none "
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 text-white bg-gray-700 rounded-r-3xl focus:outline-none"
        >
          <RiSearchLine className="w-5 h-5" />
        </button>
      </form>
      <div className="w-full">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {results.map((result) => (
              <Link key={result.id} href={`/travel/pack_plane/${result.id}`}>
                <div className="flex flex-col backdrop-filter backdrop-blur bg-opacity-20 bg-gray-100 p-4 rounded-lg shadow-lg flex-shrink-0 w-64 cursor-pointer">
                  <Image
                    src={result.imgUrl}
                    alt={result.title}
                    className="w-full h-40 object-cover rounded-t-lg mb-2"
                    width={500}
                    height={500}
                  />
                  <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                  <p className="text-gray-700">{result.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p className="flex items-center justify-center text-gray-700 font-bold text-2xl">
              No se encontraron resultados.{" "}
              <span className="text-3xl ml-2">
                {" "}
                <MdOutlinePets />{" "}
              </span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Search;
