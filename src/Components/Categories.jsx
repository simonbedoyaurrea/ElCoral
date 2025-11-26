import { link } from 'framer-motion/client';
import CategoryCard from './CategoryCard';
import categories from '../data/Categories.json'


export default function Categories() {
  return (
    <section className="flex flex-col items-center justify-center py-10 px-3 text-center bg-sky-200 h-[90vh]">
      <h2 className="text-4xl font-bold text-gray-800 mb-2">Categorías</h2>
      <p className="text-gray-600">
        Descubre nuestros productos naturales organizados en categorías para que 
        encuentres fácilmente lo que necesitas para tu cuidado y bienestar.
      </p>
      <div className="w-11/12  overflow-x-auto flex gap-8 py-2  scrollbar-hide categorias-container  ">
          {categories.map((c, index) => (
            <CategoryCard key={index} image={c.image} category={c.name} link={c.link} />
          ))}
        
      </div>
    </section>
  );
}
