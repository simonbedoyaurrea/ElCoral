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
          Your glow-up starts here
        </motion.h1>

        {/* Párrafo con retardo */}
        <motion.p
          className="mt-6 text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you're soothing sensitive skin, clearing breakouts, or chasing
          that glass-skin glow,{" "}
          <span className="font-semibold text-gray-900">Smuuti Skin</span>{" "}
          products make skincare fun, effective, and easy to love. Playful yet
          powerful skincare products that blend K-beauty innovation with fruity
          goodness.
        </motion.p>

      </div>
    </div>
  );
}
