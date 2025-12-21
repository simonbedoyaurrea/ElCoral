import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";
import useBoxStore from "../context/BoxContext";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 3,
    name: "Aceite de ricino (30ml)",
    price: 10000,
    themeColor: "#5d4037", // Marrón tierra/semilla
    image:
      "https://res.cloudinary.com/dsobv0pj7/image/upload/v1764168179/ad786f70-2c08-4997-aae8-8d8554122b13.png",
    description: "Estimula el crecimiento y fortalece desde la raíz.",
    benefits: [
      "Estimula pestañas y cejas",
      "Reduce la caída",
      "Aporta brillo y grosor",
      "Hidrata codos y talones",
    ],
  },
  {
    id: 14,
    name: "Mezcla de aceites (120ml)",
    price: 12000,
    themeColor: "#2d6a4f", // Verde bosque profundo
    image:
      "https://res.cloudinary.com/dsobv0pj7/image/upload/v1764895505/6dcd9aac-8625-4b32-b1de-b75f09df271e.png",
    description: "Poderosa combinación nutritiva para tu cabello.",
    benefits: [
      "Repara puntas abiertas",
      "Brillo profundo",
      "Nutre el cuero cabelludo",
      "Hidrata cabello maltratado",
    ],
  },
  {
    id: 6,
    name: "Aceite de coco virgen (130ml)",
    price: 16000,
    themeColor: "#fc0345", // Gris neutro/blanco coco
    image:
      "https://res.cloudinary.com/dsobv0pj7/image/upload/v1764021380/c20e78f8-ff6e-4454-9194-0c4ebb69eea1.png",
    description: "100% puro para hidratación total piel y cabello.",
    benefits: [
      "Reduce el frizz natural",
      "Desmaquillante natural",
      "Apoya salud intestinal",
      "Sin químicos agregados",
    ],
  },
  {
    id: 27,
    name: "Bronceador natural 240 ml",
    price: 25000,
    themeColor: "#b5651d", // Bronce/Canela
    image:
      "https://res.cloudinary.com/dsobv0pj7/image/upload/v1764115326/5943bf04-2bad-4adf-86ad-c7ba0041a9ed.png",
    description: "Bronceado dorado y uniforme 100% vegetal.",
    benefits: [
      "Potencia el tono dorado",
      "Macerado de zanahoria",
      "Rápida absorción",
      "Mantiene el color más tiempo",
    ],
  },
  {
    id: 35,
    name: "Jabón de Avena y Miel",
    price: 8000,
    themeColor: "#d6ccc2", // Arena/Miel
    image:
      "https://res.cloudinary.com/dsobv0pj7/image/upload/v1764798781/02abb25c-63b4-4f33-9a79-1811cdc32309.png",
    description: "Exfoliación suave para renovar tu piel.",
    benefits: [
      "Exfoliante suave",
      "Calmante natural",
      "Hidratante",
      "Piel renovada",
    ],
  },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState(products[0]);

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

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const bgCircleRef = useRef(null);
  const titleRef = useRef(null);
  const bubblesRef = useRef([]);

  // --- 1. Animación de Entrada General ---
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    ).fromTo(
      titleRef.current,
      { y: -50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.4"
    );

    // Animación de burbujas de fondo (Loop infinito)
    bubblesRef.current.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: -100 - Math.random() * 200, // Suben aleatoriamente
        x: "random(-20, 20)", // Se mueven un poco a los lados
        opacity: 0,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 2,
      });
    });
  }, []);

  // --- 2. Animación al cambiar Producto ---
  useEffect(() => {
    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768;

    // Color de fondo
    gsap.to(containerRef.current, {
      backgroundColor: active.themeColor,
      duration: 0.8,
    });

    // Imagen: Pop + Rotación
    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0, rotation: isMobile ? -5 : -15, y: 50 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // Imagen: Flotación continua
    gsap.to(imageRef.current, {
      y: isMobile ? -8 : -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.8,
    });

    // Textos: Stagger
    const textElements = textContainerRef.current.children;
    tl.fromTo(
      textElements,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.6"
    );

    // Fondo círculo
    gsap.fromTo(
      bgCircleRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1.2, opacity: 0.2, duration: 1, ease: "expo.out" }
    );
  }, [active]);

  // --- 3. Efecto Parallax con el Mouse (Solo Desktop) ---
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Desactivar en móvil para performance

    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20; // Rango de movimiento X
    const yPos = (clientY / window.innerHeight - 0.5) * 20; // Rango de movimiento Y

    // Movemos la imagen opuesta al mouse
    gsap.to(imageRef.current, {
      x: -xPos,
      y: -yPos,
      duration: 1,
      ease: "power2.out",
    });

    // Movemos el círculo de fondo en la misma dirección (profundidad)
    gsap.to(bgCircleRef.current, {
      x: xPos * 2,
      y: yPos * 2,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen md:h-screen w-full flex flex-col md:flex-row overflow-hidden transition-colors pt-16 md:pt-0"
      style={{ backgroundColor: "#171717" }}
    >
      {/* --- NUEVO: TÍTULO DESTACADO FLOTANTE --- */}
      <div
        ref={titleRef}
        className="absolute top-4 left-0 w-full z-30 flex justify-center md:justify-start md:left-8 md:top-8 pointer-events-none"
      >
        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
          <h1 className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
            Los 5 destacados de la semana
          </h1>
        </div>
      </div>

      {/* --- NUEVO: BURBUJAS DE FONDO (Loop Infinito) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (bubblesRef.current[i] = el)}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: "-50px",
            }}
          />
        ))}
      </div>

      {/* Fondo Decorativo Central */}
      <div
        ref={bgCircleRef}
        className="absolute top-[30%] md:top-1/2 left-1/2 md:left-[60%] -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white rounded-full blur-3xl pointer-events-none z-0 mix-blend-overlay"
      />

      {/* --- MENU LATERAL (Mobile: Arriba / Desktop: Izquierda) --- */}
      <aside
        className="
        w-full md:w-[280px] lg:w-[320px]
        h-auto md:h-full 
        flex flex-row md:flex-col 
        gap-3 md:gap-4 
        p-4 md:p-8 md:pt-24
        overflow-x-auto md:overflow-y-auto 
        z-20 
        bg-black/10 md:bg-black/20 backdrop-blur-md 
        border-b md:border-b-0 md:border-r border-white/10
        shrink-0
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
      "
      >
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setActive(product)}
            className={`
              group flex items-center gap-3 md:gap-4 p-2 md:p-3 
              rounded-xl md:rounded-2xl transition-all duration-300 
              text-left shrink-0 border border-transparent w-[160px] md:w-full
              ${
                active.id === product.id
                  ? "bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-[1.02]"
                  : "bg-white/5 hover:bg-white/10 hover:border-white/20"
              }
            `}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white shrink-0 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span
                className={`text-sm font-bold truncate w-full ${
                  active.id === product.id ? "text-black" : "text-white"
                }`}
              >
                {product.name
                  .replace("Jabón artesanal de ", "")
                  .replace("Jabón de ", "")}
              </span>
              <span
                className={`text-xs ${
                  active.id === product.id
                    ? "text-neutral-600"
                    : "text-neutral-400"
                }`}
              >
                ${product.price}
              </span>
            </div>
          </button>
        ))}
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 relative z-10 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-12 overflow-y-auto md:overflow-visible">
        {/* IMAGEN DEL PRODUCTO */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-4 md:mt-0 perspective-1000">
          <div className="relative">
            <img
              ref={imageRef}
              src={active.image}
              alt={active.name}
              className="w-56 h-56 md:w-[480px] md:h-[480px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 relative will-change-transform"
            />
            <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-24 md:w-48 h-4 bg-black/40 blur-xl rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* INFO DEL PRODUCTO */}
        <div
          ref={textContainerRef}
          className="w-full md:w-1/2 max-w-lg text-white text-center md:text-left pb-10 md:pb-0"
        >
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 bg-white/10 backdrop-blur-sm shadow-lg">
            <span>✨</span> Edición Limitada
          </div> */}

          <h2 className="text-3xl md:text-6xl font-black mb-4 leading-none drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
            {active.name}
          </h2>

          <p className="text-base md:text-xl text-white/90 font-medium mb-8 leading-relaxed px-2 md:px-0 drop-shadow-md">
            {active.description}
          </p>

          {/* Grid de Beneficios */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-white/90 font-medium">
            {active.benefits.slice(0, 4).map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 justify-center md:justify-start bg-black/10 rounded-lg p-2 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-yellow-300">✓</span>
                {benefit}
              </div>
            ))}
          </div>

          {/* Precio y Botón */}
          <div className="flex flex-col md:flex-row items-center gap-6 pt-6 border-t border-white/20">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-white/60 uppercase tracking-widest">
                Precio
              </span>
              <span className="text-4xl font-bold tracking-tight">
                ${active.price}
              </span>
            </div>

            {/* Botón con animación de pulso sutil */}
            <button
              onClick={() => addToBox(active)}
              className="relative w-full md:w-auto md:flex-1 group"
              aria-label="Agregar a la caja"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-200 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative py-4 px-8 rounded-full bg-white text-black font-bold text-lg hover:scale-[1.03] active:scale-95 transition-transform flex items-center justify-center gap-3">
                Agregar a la caja
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
