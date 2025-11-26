import { motion, useScroll, useTransform } from "framer-motion";

export default function RotatingImage({
  src,
  size = 100,           // tamaño por defecto 100px
  rotateRange = [0, 360], // de 0 a 360 grados
  yRange = [0, -200],     // sube 200px cuando haces scroll
  scrollRange = [0, 500], // hasta dónde hace efecto
  className = ""          // extra classes si quieres
}) {
  const { scrollY } = useScroll();

  // Rotación
  const rotate = useTransform(scrollY, scrollRange, rotateRange);

  // Movimiento en Y
  const y = useTransform(scrollY, scrollRange, yRange);

  return (
    <motion.img
      src={src}
      alt="Floating Image"
      className={`absolute ${className}`}
      style={{ 
        rotate, 
        y, 
        width: size, 
        height: size 
      }}
    />
  );
}