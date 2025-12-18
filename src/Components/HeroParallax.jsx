import { useState } from "react";

export default function HeroParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

    // posición del mouse centrada
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    setPos({ x, y });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-[400px] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Texto */}
      <h1 className="text-white text-6xl font-bold z-10">
        BRING HOME <span className="italic font-light">the</span> BOBA
      </h1>

      {/* Frambuesa izquierda */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/015/100/044/non_2x/raspberry-fruit-transparent-background-free-png.png"
        className="absolute left-20 size-40 top-32 transition-transform duration-200"
        style={{
          transform: `translate(${-pos.x * 0.03}px, ${-pos.y * 0.03}px)`
        }}
      />

      {/* Frambuesa derecha */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/015/100/044/non_2x/raspberry-fruit-transparent-background-free-png.png"
        className="absolute size-40 right-20 top-20 transition-transform duration-200"
        style={{
          transform: `translate(${-pos.x * 0.05}px, ${-pos.y * 0.05}px)`
        }}
      />
    </div>
  );
}
