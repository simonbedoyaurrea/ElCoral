import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({category,image,link}) {
  return (
    <div className="min-w-80 h-80 rounded-2xl  relative overflow-hidden shadow-lg cursor-pointer">
      <Link to={link} > 
      {/* Imagen */}
      <img
        src={image}
        alt={category}
        className="w-full h-full object-cover"
        loading='lazy'
      />

      {/* Curva con texto */}
      <div className="absolute bottom-0 w-full">
        {/* Onda */}
        <svg
          className="w-full h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,160L60,154.7C120,149,240,139,360,138.7C480,139,600,149,720,160C840,171,960,181,1080,176C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>

        {/* Fondo blanco debajo de la onda */}
        <div className="bg-white w-full text-center py-4 -mt-1">
          <p className="font-semibold text-gray-800 text-lg">{category}</p>
        </div>
      </div>
      </Link >
    </div>
  );
}
