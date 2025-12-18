import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import todosData from "../data/Products/Todos.json";
import slugify from "../utils/slugify";
import BuyButton from "./BuyButton";
import useBoxStore from "../context/BoxContext";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import useSeo from "../hooks/useSeo";
import { motion, AnimatePresence } from "framer-motion";
import ShareButton from "./ShareButton";

export default function Productdetail({ description, uses }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const productFromState = location.state?.product;
  const productSlug = params.nombreProducto || params.id || null;

  const product =
    productFromState ||
    (productSlug
      ? todosData.products.find((p) => {
          // If the param is numeric, try to match by id
          if (!Number.isNaN(Number(productSlug))) return p.id === Number(productSlug);
          // Otherwise, match by slugified name
          return slugify(p.name) === productSlug;
        })
      : null);

  const addToCart = useBoxStore((state) => state.addToCart);

  const addToBox = (product) => {
    addToCart(product);
    toast.success("Producto agregado con exito", {
      position: "bottom-right",
      autoClose: 900,
      theme: "colored",
      style: {
        backgroundColor: "rgb(63, 176, 232)",
        color: "white",
        fontWeight: "bold",
        borderRadius: "10px",
      },
    });
  };

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product?.image) setSelectedImage(product.image);
  }, [product]);

  // SEO
  useSeo({
    title: product ? `${product.name} — EL CORAL` : "Producto — EL CORAL",
    description:
      product?.description ||
      product?.ingredients?.slice(0, 4).join(", ") ||
      "",
    image: product?.image || "",
    url: window.location.href,
  });

  // ⭐ ABRIR BENEFICIOS POR DEFECTO
  const [openAccordion, setOpenAccordion] = useState("shipping");

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (!product) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-gray-500">Cargando producto...</p>
    </div>
  );
}

  return (
    <div>
      <Navbar enableColorChange={false} />

      <button
  onClick={() => {
    const from = location.state?.from;
    // If we have an explicit origin, go there
    if (from) return navigate(from);

    // If the document referrer is internal, prefer going back in history
    if (document.referrer && document.referrer.startsWith(window.location.origin)) {
      return navigate(-1);
    }

    // Otherwise fallback to the products listing (categorias/todos)
    navigate("/categorias/todos");
  }}
  className="absolute left-4 top-24 md:left-20 md:top-32 
             z-20 flex items-center gap-2 bg-white/80 backdrop-blur 
             px-3 py-2 rounded-full shadow-md text-gray-700 
             hover:bg-white transition"
>
  <span className="text-xl">←</span>
  <span className="hidden sm:block font-medium">Volver</span>
</button>
      <div className="h-20" />

       

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 p-6 max-w-6xl mx-auto">

        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          
        >
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl bg-white">
            <img
              src={selectedImage}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* INFORMACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >

          {/* Título */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{product?.name}</h1>

            {product?.shortDescription && (
              <p className="text-gray-600 mt-2 text-lg">
                {product.shortDescription}
              </p>
            )}

            <p className="text-3xl font-extrabold mt-4 text-blue-600 tracking-tight">
               $ {new Intl.NumberFormat('es-CO').format(product?.price)} COP
            </p>
          </div>

          {/* Descripción */}
          <p className="text-gray-700 leading-relaxed text-lg">{description}</p>

          {/* BOTÓN AGREGAR */}
          <div className="pt-4 flex gap-3">
            <BuyButton addToBox={() => addToBox(product)} />
            <ShareButton product={product} />
          </div>

          {/* ACCORDEONS */}
          <div className="border border-gray-2 rounded-xl overflow-hidden bg-white shadow-sm">

            {/* Ingredientes */}
            <div>
              <button
                onClick={() => toggleAccordion("ingredients")}
                className="w-full flex justify-between items-center p-4 text-left font-semibold"
              >
                Ingredientes y Componentes
                <span>{openAccordion === "ingredients" ? "-" : "+"}</span>
              </button>

              <AnimatePresence>
                {openAccordion === "ingredients" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 text-sm text-gray-600 space-y-1"
                  >
                    {product?.ingredients?.map((ingredient, index) => (
                      <p key={index}>• {ingredient}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Usos */}
            {/* <div>
              <button
                onClick={() => toggleAccordion("how")}
                className="w-full flex justify-between items-center p-4 text-left font-semibold"
              >
                Usos
                <span>{openAccordion === "how" ? "-" : "+"}</span>
              </button>

              <AnimatePresence>
                {openAccordion === "how" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 text-sm text-gray-600"
                  >
                    {uses}
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            {/* Beneficios — ABIERTO POR DEFECTO */}
            <div>
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex justify-between items-center p-4 text-left font-semibold"
              >
                Beneficios
                <span>{openAccordion === "shipping" ? "-" : "+"}</span>
              </button>

              <AnimatePresence>
                {openAccordion === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 text-sm text-gray-600 space-y-1"
                  >
                    {product?.benefits?.map((benefit, index) => (
                      <p key={index}>• {benefit}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          
        </motion.div>
      </div>
    </div>
  );
}
