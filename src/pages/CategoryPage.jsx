import CategoryTitle from "../Components/CategoryTitle";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import arcillas from "../data/Products/Arcillas.json";
import aceites from "../data/Products/Aceites.json";
import macerados from "../data/Products/Macerados.json";
import bronceadores from "../data/Products/Bronceadores.json";
import exfoliantes from "../data/Products/Exfoliantes.json";
import mantecas from "../data/Products/Mantecas.json";
import todos from "../data/Products/Todos.json";
import mascarillas from "../data/Products/Mascarillas.json";
import jabones from "../data/Products/Jabones.json";
import tratamientos from "../data/Products/TratamientosFaciales.json";
import CategoryBox from "../Components/CategoryBox";
import categories from "../data/Categories.json";
import balsamos from "../data/Products/Balsamos.json";
import useSeo from "../hooks/useSeo";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoriesMap = {
    arcillas,
    aceites,
    macerados,
    mantecas,
    mascarillas,
    exfoliantes,
    bronceadores,
    tratamientos,
    jabones,
    balsamos,
    todos,
  };
  const currentCategory = categoriesMap[categoryName];

  const productsList =
    (currentCategory &&
      (currentCategory.products || currentCategory.productos)) ||
    [];

  const fuse = useMemo(
    () =>
      new Fuse(productsList, {
        keys: ["name", "description"],
        threshold: 0.35,
      }),
    [productsList]
  );

  const filtered =
    query && query.trim()
      ? fuse.search(query).map((r) => r.item)
      : productsList;

  useSeo({
    title: currentCategory?.name
      ? `${currentCategory.name} — EL CORAL`
      : "Categoría — EL CORAL",
    description:
      currentCategory?.description ||
      currentCategory?.descripcion ||
      `Productos de la categoría ${currentCategory?.name || ""}`,
    image: currentCategory?.image || "",
    url: window.location.href,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar enableColorChange={false} />
      <main className="flex flex-col gap-6 pt-6 min-h-screen mt-14 ">
        {/* Título */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=" py-2 mt-3"
        >
          <div className="max-w-7xl mx-auto px-4 text-center flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {currentCategory?.name}
            </h1>
            <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
              {currentCategory?.description}
            </p>
          </div>
        </motion.header>

        {/* Contenedor principal */}
        <div className="flex w-11/12 mx-auto gap-6 relative">
          {/* Sidebar izquierda - Desktop only */}
          <div className="hidden md:block w-1/4">
            <div className="sticky top-20 bg-neutral-100 flex flex-col gap-1 items-center text-white rounded-2xl p-2">
              {categories.map((c) => (
                <CategoryBox key={c.name} name={c.name} link={c.link} />
              ))}
            </div>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden fixed bottom-24 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition"
          >
            <FiFilter size={20} />
          </button>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFiltersOpen(false)}
                />

                {/* Drawer */}
                <motion.div
                  className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-40 max-h-[70vh] overflow-y-auto shadow-2xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  {/* Header */}
                  <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b rounded-t-3xl">
                    <h2 className="text-lg font-semibold">Filtros</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      <CgClose size={24} />
                    </button>
                  </div>

                  {/* Filter content */}
                  <div className="p-6 space-y-6">
                    {/* Categories filter */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Categorías
                      </h3>
                      <div className="space-y-2 flex flex-col">
                        {categories.map((c) => (
                          <Link to={c.link} className="w-11/12">
                            <div
                              onClick={() => setMobileFiltersOpen(false)}
                              className="text-white cursor-pointer rounded-2xl bg-red-700 py-3 px-2 text-center hover:bg-red-400 transition-colors duration-300"
                            >
                              {c.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Price filter example (expandable) */}
                    {/* <div className="pt-4 border-t">
                      <h3 className="font-semibold text-gray-800 mb-3">Rango de precio</h3>
                      <p className="text-sm text-gray-500">Funcionalidad a implementar</p>
                    </div> */}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Bloque derecho */}
          <div className="flex-1 s p-4 rounded-2xl">
            {/* Search input */}
            <div className="w-full mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full p-3 rounded-xl border focus:outline-none"
              />
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 place-items-center">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
