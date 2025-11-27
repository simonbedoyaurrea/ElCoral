import React from "react";
import balsamoAmarillo from '../assets/BalsamoAmarillo.png';
import balsamoCafe from '../assets/BalsamoCafe.png';
import mockupLabios from '../assets/mockupBalsamo.png';
import { Link } from "react-router-dom";

export default function BalsamosSeccion() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-amber-50 rounded-lg overflow-hidden shadow-lg mt-7 p-3 md:p-6 min-h-screen md:h-[100dvh]">
      {/* Columna Izquierda */}
      <div className="flex flex-col justify-between p-4 md:p-6 w-full md:w-1/2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            CONOCE NUESTRA LÍNEA <br /> DE BÁLSAMOS LABIALES
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base text-justify">
            Descubre la suavidad natural de nuestros bálsamos labiales, elaborados con cera de abejas, manteca de cacao, vitamina E y macerados naturales. 
            Una mezcla única que hidrata, protege y nutre tus labios, dejándolos irresistiblemente suaves y saludables.
          </p>
          <Link to="/categorias/balsamos">
          <button className="cursor-pointer bg-[rgb(233,1,32)] hover:bg-red-900 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300">
            ¡Mira Ahora!
          </button>
          </Link>
        </div>

        {/* Imagen inferior izquierda */}
        <div className="mt-8 flex justify-center md:justify-start">
          <img src={mockupLabios} alt="Applying lip mask" className="rounded-lg w-[320px] h-[300px] object-cover object-[50%_30%] " />
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="bg-amber-100 rounded-2xl md:h-[85%] w-full md:w-2/5 mt-8 md:mt-0 flex items-center justify-center p-6 md:p-8">
        <img
          src={balsamoAmarillo}
          alt="Bálsamo Amarillo"
          className="w-[45%] md:w-auto h-[220px] md:h-[80%] object-contain mx-3 transition-transform duration-300 hover:scale-105"
        />
        <img
          src={balsamoCafe}
          alt="Bálsamo Café"
          className="w-[45%] md:w-auto h-[220px] md:h-[80%] object-contain mx-3 transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}
