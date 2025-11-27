import { motion } from "framer-motion";

export default function Tagline() {
  return (
    <div className="max-w-full mx-auto px-6 py-16 text-center relative">
      <div className="max-w-3xl mx-auto text-center z-20 relative">

        {/* Título con animación */}
        <motion.h1
          className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}  // Solo se anima la primera vez
        >
          Tu bienestar empieza aquí
        </motion.h1>

        {/* Párrafo con retardo */}
        <motion.p
          className="mt-6 text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ya sea que quieras cuidar tu piel, reducir irritaciones o disfrutar ingredientes naturales de verdad,{" "}
          <span className="font-semibold text-gray-900">El Coral</span>{" "}
          ofrece productos que son puros, efectivos y fáciles de amar.
          Desde aceite de coco natural y jabones artesanales hasta aceites botánicos, arcillas, manteca de cacao y bálsamos labiales,
          nuestros productos combinan lo mejor de la naturaleza con el cuidado que tu piel merece.
        </motion.p>

      </div>
    </div>
  );
}
