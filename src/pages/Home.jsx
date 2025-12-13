import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Tagline from '../Components/Tagline'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import BalsamosSeccion from '../Components/BalsamosSeccion'
import SocialSlideBar from '../Components/SocialSlideBar'
import Footer from '../Components/Footer'
import useSeo from '../hooks/useSeo'
import NewProductBanner from '../Components/NewProductBanner'

export default function Home() {
  useSeo({
    title: 'EL CORAL — Productos naturales y artesanales',
    description: 'Productos naturales: aceites, mascarillas, exfoliantes y bálsamos labiales hechos a mano.',
    image: '/ELCORALLOGO-BiizK0FI.jpeg',
    url: window.location.href,
  })
  return (
     <>
          <Navbar />
          <Banner />
          <Tagline />
          <Slider />
          {/* <BeforeAndAfter /> */}
          <NewProductBanner
          imageUrl="https://res.cloudinary.com/dsobv0pj7/image/upload/v1765583822/25ff5328-69af-4cfc-ace0-a36685e85201.png"
          productName="Nuevo producto: Exfoliante corporal de menta y vainilla"
          productDescription="Descubre nuestro nuevo exfoliante de menta y vainilla."
          ctaText="Comprar Ahora"
          link="/productos/exfoliante-corporal-de-menta-y-vainilla-130-gr"
        />
          <Categories />
          <BalsamosSeccion />
          <SocialSlideBar />           
          {/* <FAQSection />     */}
          <Footer />
        </>
  )
}
