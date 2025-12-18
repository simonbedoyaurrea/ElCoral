import { motion } from "framer-motion";
import { GiCoral, GiHearts } from "react-icons/gi";

export default function Footer() {
  return (
    // <div className="bg-[linear-gradient(to_top,#f87171_0%,#fecaca_40%,transparent_90%)]">
    <div className="bg-gradient-to-t from-rose-400 via-rose-200 to-transparent">
      {/* 🔁 Texto infinito arriba del footer */}
      <div className="relative overflow-hidden mt-40 ">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 25,
        }}
      >
        <span className="text-[10vw] font-extrabold tracking-tight mx-8 text-[#e90120]  uppercase flex items-center gap-8">
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
        </span>

        {/* Duplicado para el loop continuo */}
        <span className="text-[10vw] font-extrabold tracking-tight mx-8 text-[#e90120]  uppercase flex items-center gap-8">
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
          EL CORAL 
          <GiCoral className="inline-block text-[8vw] align-middle mx-4" />
        </span>
      </motion.div>
    </div>

      {/* 🌊 Footer principal */}
      <footer className="relative h60 mt-0 text-white ">
        {/* Onda superior */}
        <div
          className="absolute -top-16 left-0 w-full overflow-visible pointer-events-none"
          style={{ height: 90 }}
        >
        
        </div>

        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm">
              © {new Date().getFullYear()} El Coral. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              {/* <a href="#facebook" className="hover:text-gray-400">Facebook</a>
              <a href="#instagram" className="hover:text-gray-400">Instagram</a>
              <a href="#twitter" className="hover:text-gray-400">Twitter</a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
