import { FiShare2 } from "react-icons/fi";

export default function ShareButton({ product }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Mira este producto: ${product.name}`,
          url: window.location.href,
        });
      } else {
        // fallback en caso de que el navegador NO soporte share
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado 📎");
      }
    } catch (error) {
      console.log("Error al compartir", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-2 rounded-full 
                 bg-gray-100 hover:bg-gray-200 transition text-gray-700 
                 border border-gray-300"
    >
      <FiShare2 className="text-lg" />
      <span className="hidden sm:block text-sm font-medium">Compartir</span>
    </button>
  );
}
