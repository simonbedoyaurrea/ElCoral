import RotatingImage from './RotatingImage'
import { Link } from 'react-router-dom'


export default function Banner() {
  return (
      <section className="relative w-full h-screen flex items-center justify-center">

      {/* Imagen principal (LCP) */}
      <img
        src="https://res.cloudinary.com/dsobv0pj7/image/upload/v1764129220/a9146fa3-dfca-4afd-9037-006a6577b720.png"
        alt="Belleza Natural Banner"
        className="absolute inset-0 w-full h-full object-cover"
        fetchpriority="high"
        width={1920}
        height={1080}
      />

      <RotatingImage
       src={'https://res.cloudinary.com/dsobv0pj7/image/upload/v1764180293/6a6e75ee-3b5b-454f-885f-125b91307f9e.png'} 
       className="right-20 bottom-8 z-10"
       size={200}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center text-white max-w-2xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Belleza Natural
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Cosmética hecha con ingredientes 100% naturales para tu bienestar.
        </p>
        <Link to="/categorias/todos" className="inline-block">
          <button className="px-6 py-3 bg-[rgb(227,0,27)] text-white font-medium rounded-lg shadow-md hover:bg-cyan-500 transition duration-300 cursor-pointer">
            Ver Productos
          </button>
        </Link>
      </div>

      {/* Onda al final */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-32"
            preserveAspectRatio="none"
        >
            <path
            fill="#ffffff"
            d="M0,192 C480,320 960,64 1440,192 L1440,320 L0,320 Z"
            ></path>
        </svg>
       </div>
    </section>

  )
}
