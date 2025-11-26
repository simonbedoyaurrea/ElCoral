export default function BuyButton({addToBox}) {
  return (
    <button onClick={addToBox}
      className="w-[380px] h-[40px] rounded-[40px] border border-white/30 
                bg-cyan-500 flex items-center justify-center cursor-pointer 
                 overflow-hidden transition-transform duration-300 active:scale-95 group"
    >
      {/* Icon container */}
      <div
        className="w-[60px] h-[30px] rounded-full flex items-center justify-center 
                   bg-cyan-800
                   transition-all duration-300 z-10 group-hover:w-[360px]"
      >
        <svg className=" stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="black" stroke-width="5" stroke-linejoin="round">
  
            <polygon points="8,20 32,32 32,60 8,48" />
            
            <polygon points="32,32 56,20 56,48 32,60" />
            
            <polygon points="8,20 32,8 56,20 32,32" />
            
            <line x1="8" y1="20" x2="32" y2="8" />
            
            <line x1="56" y1="20" x2="32" y2="8" />
        </svg>

      </div>

      {/* Text */}
      <span
        className="w-[200px] text-white text-[1.04em] flex items-center justify-center 
                   transition-all duration-300 group-hover:translate-x-2 
                   group-hover:w-0 group-hover:text-[0px] z-0"
      >
        Enviar al paquete
      </span>
    </button>
  );
}
