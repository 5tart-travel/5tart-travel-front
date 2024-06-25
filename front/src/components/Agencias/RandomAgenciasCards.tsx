'use client'
import React, { useState, useEffect } from "react";
import CardAgencia from "./CardAgencia";

const RandomAgenciasCards: React.FC = () => {
  const [randomAgencias, setRandomAgencias] = useState([]);

  useEffect(() => {
    fetch("https://huellasdesperanza.onrender.com/shelters")
      .then(response => response.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRandomAgencias(selected);
      })
      .catch(error => console.error("Error fetching refugios:", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {randomAgencias.map((agencia, index) => (
        <CardAgencia key={index} agencia={agencia} />
      ))}
    </div>
  );
};

export default RandomAgenciasCards;
