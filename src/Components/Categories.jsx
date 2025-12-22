import React from "react";
import { motion } from "framer-motion"; // Importamos motion
import CategoryCard from "./CategoryCard";
import categories from "../data/Categories.json";

export default function Categories() {
  // Configuración de la animación del contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso de 0.2s entre la aparición de cada tarjeta
      },
    },
  };

  return (
    <section className="flex flex-col items-center justify-center py-10 px-3 text-center bg-sky-200 h-[90vh]">
      {/* Animación simple para el título y texto */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Categorías</h2>
        <p className="text-gray-600 mb-6">
          Descubre nuestros productos naturales organizados en categorías para
          que encuentres fácilmente lo que necesitas para tu cuidado y
          bienestar.
        </p>
      </motion.div>

      {/* Contenedor de tarjetas animado */}
      <motion.div
        className="w-11/12 overflow-x-auto flex gap-8 py-2 scrollbar-hide categorias-container"
        variants={containerVariants} // Asignamos las variantes
        initial="hidden" // Estado inicial
        whileInView="visible" // Estado cuando entra en pantalla
        viewport={{ once: true, amount: 0.2 }} // Se anima una sola vez
      >
        {categories.map((c, index) => (
          <CategoryCard
            key={index}
            image={c.image}
            category={c.name}
            link={c.link}
          />
        ))}
      </motion.div>
    </section>
  );
}
