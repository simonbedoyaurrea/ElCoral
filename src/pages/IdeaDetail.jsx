import { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import productos from "../data/Products/Todos.json";
import slugify from "../utils/slugify";
import posts from "../data/blog/mascarillas.json";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import ShareButton from "../Components/ShareButton";
import useSeo from "../hooks/useSeo";

export default function IdeaDetail({}) {
  const location = useLocation();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const navigate = useNavigate();
  const { ideaNombre } = useParams();
  const postFromState = location.state?.post;
  const post =
    postFromState ?? posts.posts.find((p) => slugify(p.title) === ideaNombre);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // SEO
  useSeo({
    title: `${post.title} — EL CORAL`,
    description: (post.content || "")
      .replace(/\*\*/g, "")
      .split("\n\n")[0]
      .slice(0, 160),
    image: post.image || "",
    url: window.location.href,
  });

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image ? [post.image] : [],
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "EL CORAL",
    },
    description: (post.content || "")
      .replace(/\*\*/g, "")
      .split("\n\n")[0]
      .slice(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
    publisher: {
      "@type": "Organization",
      name: "EL CORAL",
      logo: {
        "@type": "ImageObject",
        url: "/ELCORALLOGO-BiizK0FI.jpeg",
      },
    },
  };

  function formatContent(text) {
    return text.split("\n\n").map((block, i) => (
      <p key={i} className="mb-4 text-gray-700 leading-relaxed">
        {block
          .split("**")
          .map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
      </p>
    ));
  }

  const handleProduct = (id) => {
    const product = productos.products.find((p) => p.id === id);

    navigate(`/productos/${slugify(product.name)}`, {
      state: { product },
    });
  };

  const postProducts = post
    ? productos.products.filter((product) =>
        post.products?.includes(product.id)
      )
    : [];

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };
  }

  useEffect(() => {
    const animate = () => {
      // LERP (suavizado)
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      document.documentElement.style.setProperty(
        "--mx",
        `${current.current.x}px`
      );
      document.documentElement.style.setProperty(
        "--my",
        `${current.current.y}px`
      );

      raf.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <article className="bg-white flex flex-col min-h-screen ">
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
        />
      )}
      <Navbar enableColorChange={false} />

      <button
        onClick={() => {
          const from = location.state?.from;
          if (from) return navigate(from);
          if (
            document.referrer &&
            document.referrer.startsWith(window.location.origin)
          )
            return navigate(-1);
          navigate("/blog");
        }}
        className="fixed left-4 top-22 md:left-20 md:top-22 z-20 flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow-md text-gray-700 hover:bg-white transition"
      >
        <span className="text-xl">←</span>
        <span className="hidden sm:block font-medium">Volver</span>
      </button>
      <div className="" />

      {/* ===== HERO ===== */}
      <section
        onMouseMove={handleMouseMove}
        className="
          relative
          bg-gradient-to-b from-lime-900 to-gray-200
          overflow-visible
          rounded-b-[50px] md:rounded-b-[220px] mt-20
        "
      >
        {/* Texto */}
        <div className="relative z-10 text-center pt-10 px-4">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-6xl">
            {post.title}
          </h1>
          <p className="text-gray-200 mt-3 text-xs sm:text-sm">{post.date}</p>
        </div>

        {/* Fruta izquierda */}
        <img
          src="https://res.cloudinary.com/dsobv0pj7/image/upload/w_200,h_200,c_limit,f_auto,q_auto/6a6e75ee-3b5b-454f-885f-125b91307f9e.png"
          alt=""
          className="absolute left-4 sm:left-10 top-24 w-12 sm:w-16 md:w-20"
          style={{
            transform:
              "translate(calc(var(--mx) * -0.04), calc(var(--my) * -0.04))",
          }}
        />

        {/* Fruta derecha */}
        <img
          src="https://res.cloudinary.com/dsobv0pj7/image/upload/w_200,h_200,c_limit,f_auto,q_auto/6a6e75ee-3b5b-454f-885f-125b91307f9e.png"
          alt=""
          className="absolute right-4 sm:right-10 top-16 w-14 sm:w-20 md:w-24"
          style={{
            transform:
              "translate(calc(var(--mx) * -0.06), calc(var(--my) * -0.06))",
          }}
        />

        {/* Imagen principal */}
        <div className="relative z-10 flex justify-center px-4">
          <img
            src={post.image}
            alt={post.title}
            className="
              w-[90%] sm:w-[85%] md:w-[80%] lg:w-full
              max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl
              h-64 sm:h-72 md:h-80 lg:h-[420px]
              object-cover
              rounded-2xl lg:rounded-3xl
              shadow-[0_40px_120px_rgba(0,0,0,0.45)]
              translate-y-12 sm:translate-y-16 md:translate-y-18 lg:translate-y-20
            "
            style={{
              transform:
                "translateY(4rem) translate(calc(var(--mx) * 0.02), calc(var(--my) * 0.02))",
            }}
          />
        </div>
      </section>

      {/* ===== CONTENIDO ===== */}
      <section className="max-w-5xl mx-auto px-6 pt-50 pb-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* INGREDIENTES */}
          <div>
            <div className="flex flex-col gap-2">
              <h2 className="font-extrabold text-sm tracking-widest mb-4">
                PRODUCTOS
              </h2>
              <div className="flex gap-1.5">
                {postProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover="hover"
                    className="relative"
                  >
                    {/* Imagen */}
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      onClick={() => handleProduct(p.id)}
                      variants={{
                        hover: { scale: 1.12 },
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="
                      size-20
                      rounded-3xl
                      object-cover
                      cursor-pointer
                    "
                    />

                    {/* Tooltip */}
                    <motion.div
                      variants={{
                        hover: { opacity: 1, y: 0 },
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="
                      pointer-events-none
                      absolute
                      -top-9
                      left-1/2
                      -translate-x-1/2
                      whitespace-nowrap
                      rounded-md
                      bg-black/80
                      px-2 py-1
                      text-xs text-white
                    "
                    >
                      {p.name}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
            <h2 className="font-extrabold text-sm tracking-widest mb-4 mt-4">
              INGREDIENTES
            </h2>

            <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
              {post.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            </ul>
            {/* Botón compartir */}
            <div className="relative z-10 flex justify-center mt-4">
              <ShareButton post={post} />
            </div>
          </div>

          {/* Contenido */}
          <div className="md:col-span-2">{formatContent(post.content)}</div>
        </div>
      </section>
      <Footer />
    </article>
  );
}
