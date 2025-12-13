import { Link } from "react-router-dom";
import slugify from "../utils/slugify";
import { toast } from "react-toastify";
import useBoxStore from "../context/BoxContext";
import { FaBox } from "react-icons/fa";

export default function ProductCard({ product,categoryName }) {

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

  return (
    <div className="cursor-pointer flex flex-col items-center bg-gray-100 rounded-2xl shadow-md overflow-hidden 
      w-full max-w-[180px] sm:max-w-[230px] md:max-w-[350px] 
      md:min-h-[450px]  /* altura base solo en PC */
      transition-transform hover:scale-105">
      <Link to={`/productos/${slugify(product.name)}`} state={{ product}}>
         
            <div className="w-full aspect-square overflow-hidden max-w-[350px] mx-auto">
              <img
              src={product.image ?product.image:"https://res.cloudinary.com/dsobv0pj7/image/upload/v1764893460/44dc0ffd-8642-4476-b1f8-b8fabcdb18f5.png"}
              alt={`Comprar ${product.name} al mejor precio`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            </div>

              {/* Info */}
              <div className="text-center p-2">
                <h2 className="font-semibold text-gray-800 line-clamp-3">{product.name}</h2>
                <p className="text-gray-600">${new Intl.NumberFormat('es-CO').format(product.price)} COP</p>
              </div>
      </Link>
        <button
        onClick={() => addToBox(product)}
        className="text-[#f4ffdb] bg-blue-400 hover:bg-blue-600 flex items-center gap-1  font-semibold py-2 px-4 rounded-xl my-2"
      >
       <FaBox /> agregar
      </button>
    </div>
  );
} 


