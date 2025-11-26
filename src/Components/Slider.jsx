

const frases = [
    "Ingredientes naturales",
    "Esencia natural",
    "Naturaleza en tu piel",
    "Cuidado orgánico",
    "Pureza que se siente",
    "Brilla naturalmente",
    "Belleza sin químicos",
    "Naturaleza que nutre"
  ]

export default function Slider () {
    
 return (
    <div className="overflow-hidden whitespace-nowrap border-t border-b py-4 bg-cyan-700 h-20 flex items-center">
      <div className="inline-block animate-marquee">
        {frases.map((phrase, index) => (
          <span key={index} className="mx-8 text-xl text-white">
            {phrase}
          </span>
        ))}
        {/* duplicamos para efecto infinito */}
        {frases.map((phrase, index) => (
          <span key={`dup-${index}`} className="mx-8 text-xl text-white  ">
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
