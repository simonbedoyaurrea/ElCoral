import { Route, Routes } from "react-router-dom"
import ProductDetail from "./Components/ProductDetail"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import { ToastContainer } from "react-toastify"
import ScrollToTop from "./Components/ScrollToTop"

function App() {
  

  return (
    <>
    <ScrollToTop />
    <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/categorias/:categoryName" element={<CategoryPage />} />
        <Route path="/productos/:nombreProducto" element={<ProductDetail />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        {/* Ruta por defecto si no existe */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
       <ToastContainer />
    </>
  )
}

export default App
