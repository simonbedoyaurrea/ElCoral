import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import todosData from "../data/Products/Todos.json";
import BuyButton from "./BuyButton";
import useBoxStore from "../context/BoxContext";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import useSeo from "../hooks/useSeo";

export default function Productdetail({ imagenes, description, uses }) {
  const location = useLocation();
  const params = useParams();

  const productFromState = location.state && location.state.product;
  const productId = params.id ? Number(params.id) : null;

  const product =
    productFromState ||
    (productId ? todosData.products.find((p) => p.id === productId) : null);

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

  // Solo una imagen
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

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div>
      <Navbar enableColorChange={false} />

      <div className="h-16" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 max-w-6xl mx-auto">
        {/* Imagen única */}
        <div>
          <div className="w-full max-w-[650px] aspect-[4/4] rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Info producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <p className="text-xl font-semibold mt-2">
              ${product?.price ?? "-"} COP
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">{description}</p>

          {/* Acordeones */}
          <div className="border-t border-b divide-y">
            <div>
              <button
                onClick={() => toggleAccordion("ingredients")}
                className="w-full flex justify-between py-3 text-left font-medium"
              >
                Ingredientes y Componentes
                <span>{openAccordion === "ingredients" ? "-" : "+"}</span>
              </button>
              {openAccordion === "ingredients" && (
                <div className="p-2 text-sm text-gray-600">
                  {product.ingredients?.map((ingredient, index) => (
                    <p key={index}>- {ingredient}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleAccordion("how")}
                className="w-full flex justify-between py-3 text-left font-medium"
              >
                Usos
                <span>{openAccordion === "how" ? "-" : "+"}</span>
              </button>
              {openAccordion === "how" && (
                <div className="p-2 text-sm text-gray-600">{uses}</div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex justify-between py-3 text-left font-medium"
              >
                Beneficios
                <span>{openAccordion === "shipping" ? "-" : "+"}</span>
              </button>
              {openAccordion === "shipping" && (
                <div className="p-2 text-sm text-gray-600">
                  <ul>
                    {product.benefits.map((benefit, index) => (
                      <li key={index}>- {benefit}</li>
                    ))}
                  </ul>
                  
                </div>
              )}
            </div>
          </div>

          {/* Botón comprar */}
          <div className="flex gap-4">
            <BuyButton addToBox={() => addToBox(product)} />
          </div>
        </div>
      </div>
    </div>
  );
}
