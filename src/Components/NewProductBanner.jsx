import React from 'react';
import { Link } from 'react-router-dom';

export default function NewProductBanner({ imageUrl, productName, productDescription, ctaText,link }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-400 to-black text-white relative overflow-hidden rounded-lg shadow-lg">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 bg-fixed"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {productName}
          </h2>
          <p className="mb-6 text-lg md:text-xl">{productDescription}</p>
          <Link to={link} className="inline-block">
            <button className="bg-white text-red-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
                {ctaText}
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src={imageUrl}
            alt={productName}
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
