export default function BuyButton({ addToBox }) {
  return (
    <button
      onClick={addToBox}
      className="
        w-full md:w-[380px] h-[48px]
        rounded-full 
        bg-cyan-600 hover:bg-cyan-700 
        text-white font-semibold 
        flex items-center justify-center gap-3
        shadow-lg shadow-cyan-500/30
        transition-all duration-300
        active:scale-95
        overflow-hidden relative group
      "
    >
      {/* Ícono con animación */}
      <div
        className="
          w-10 h-10 
          bg-cyan-800/80 
          rounded-full 
          flex items-center justify-center
          transition-all duration-300
          group-hover:w-[160px]
        "
      >
        <svg
          className="stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="26"
          height="26"
          fill="none"
          strokeWidth="5"
          strokeLinejoin="round"
        >
          <polygon points="8,20 32,32 32,60 8,48" />
          <polygon points="32,32 56,20 56,48 32,60" />
          <polygon points="8,20 32,8 56,20 32,32" />
        </svg>
      </div>

      {/* Texto animado */}
      <span
        className="
          text-base tracking-wide
          transition-all duration-300
          group-hover:opacity-0 
          group-hover:-translate-x-2
        "
      >
        Enviar al paquete
      </span>
    </button>
  );
}
