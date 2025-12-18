import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../Components/Navbar";
import BlogCard from "../Components/BlogCard";
import Footer from "../Components/Footer";
import SocialSlideBar from "../Components/SocialSlideBar";
import posts from "../data/blog/mascarillas.json";

export default function Blog() {
  const [currentPosts, setCurrentPosts] = useState(posts.posts);

  const handlePosts = (type) => {
    setCurrentPosts(
      type === "Todos"
        ? posts.posts
        : posts.posts.filter((p) => p.type === type)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-rose-500/20 to-sky-500/20">
      <Navbar enableColorChange={false} />
      <SocialSlideBar />

      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-14 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
            ¿Sabías que nuestros productos tienen mil usos? Aquí encontrarás recetas,
            mascarillas, tips y mezclas exclusivas para aprovecharlos al máximo.
            Inspírate, aprende y crea nuevas ideas para tu día a día.
          </p>
        </div>
      </motion.header>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10">
        {/* FILTROS */}
        <section className="w-full flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center">
          <div className="flex gap-3 flex-wrap">
            {["Todos", "Recetas", "Mascarillas", "Tips"].map((type) => (
              <motion.button
                key={type}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePosts(type)}
                className="px-4 py-2 rounded-full border text-sm hover:bg-[#e90120] hover:text-white transition"
              >
                {type}
              </motion.button>
            ))}
          </div>
        </section>

        {/* GRID CON ANIMACIÓN */}
        <motion.section
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* PAGINACIÓN (lista para animar luego) */}
        <section className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((n) => (
            <motion.button
              key={n}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-black hover:text-white transition"
            >
              {n}
            </motion.button>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
