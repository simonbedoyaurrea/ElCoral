// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="relative bg-[#0b1120] h-96 text-white mt-20 ">
      {/* Onda: colocada con -top para sobresalir sobre la sección anterior */}
      <div
        className="absolute -top-16 left-0 w-full overflow-visible pointer-events-none"
        style={{ height: 70 }} // ajusta la altura según necesites
      >
        <svg
          className="block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* USA camelCase: fillOpacity */}
          <path
  fill="#0b1120"   // mismo color del footer
  fillOpacity="1"
  d="M0,192L30,197.3C60,203,120,213,180,197.3C240,181,300,139,360,101.3C420,64,480,32,540,42.7C600,53,660,107,720,133.3C780,160,840,160,900,160C960,160,1020,160,1080,170.7C1140,181,1200,203,1260,213.3C1320,224,1380,224,1410,224L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
/>

        </svg>
      </div>

      {/* Contenido del footer (encima de la onda) */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">© {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#facebook" className="hover:text-gray-400">Facebook</a>
            <a href="#instagram" className="hover:text-gray-400">Instagram</a>
            <a href="#twitter" className="hover:text-gray-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
