import { FiShare2 } from "react-icons/fi";

export default function ShareButton({ product }) {
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Mira este producto: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Compartido exitosamente");
      } else {
        // fallback: copiar al portapapeles
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareData.url);
          alert("Link copiado 📎");
        } else {
          // fallback más antiguo para navegadores viejos
          const tempInput = document.createElement("input");
          tempInput.value = shareData.url;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
          alert("Link copiado 📎");
        }
      }
    } catch (error) {
      console.log("Error al compartir", error);
      // Si algo falla, intentar copiar al portapapeles
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copiado 📎");
      }
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
