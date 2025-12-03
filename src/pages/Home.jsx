import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Tagline from '../Components/Tagline'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import BalsamosSeccion from '../Components/BalsamosSeccion'
import SocialSlideBar from '../Components/SocialSlideBar'
import Footer from '../Components/Footer'
import useSeo from '../hooks/useSeo'

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
          <Categories />
          <BalsamosSeccion />
          <SocialSlideBar />           
          {/* <FAQSection />     */}
          <Footer />
        </>
  )
}
