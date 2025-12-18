import { Route, Routes } from "react-router-dom"
import ProductDetail from "./Components/ProductDetail"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import { ToastContainer } from "react-toastify"
import ScrollToTop from "./Components/ScrollToTop"
import IdeaDetail from "./pages/IdeaDetail"
import Blog from "./pages/Blog"

function App() {
  

  return (
    <>
    <ScrollToTop />
    <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/categorias/:categoryName" element={<CategoryPage />} />
        <Route path="/productos/:nombreProducto" element={<ProductDetail />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        {/* <Route path="/idea/:ideaId" element={<IdeaDetail />} /> */}
        <Route path="/ideas/:ideaNombre" element={<IdeaDetail />} />
        <Route path="/blog" element={<Blog />} />
        {/* Ruta por defecto si no existe */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
       <ToastContainer />
    </>
  )
}

export default App
