import { useEffect, useState } from 'react'
import Logo from '../assets/ELCORALLOGO.jpeg'
import { FaBox } from 'react-icons/fa'
import Box from './Box'
import { Link } from 'react-router-dom'

export default function Navbar({ enableColorChange = true }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35) { 
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    if (enableColorChange) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`p-4 ease-in w-full fixed z-50 transition-colors duration-300   ${
        (scrolled) ? 'bg-[#e90120] bg-[url("https://www.transparenttextures.com/patterns/arabesque.png")] text-white shadow-lg' :enableColorChange?'': ' border-b-1 bg-[#e90120] text-white bg-[url("https://www.transparenttextures.com/patterns/arabesque.png")]'
      }`}
    >
      <nav className="flex items-center justify-between max-w-6xl mx-auto relative">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-8 w-auto" />
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-6 items-center ">
          <Link to={"/"} className="hover:text-gray-300 text-white transition">Inicio</Link>
          <p  className="hover:text-gray-300 transition text-white">Productos</p>
          <Box />
          {/* <a href="#sobre-nosotros" className="hover:text-gray-300 transition">Sobre Nosotros</a> */}
          {/* <a href="#contacto" className="hover:text-gray-300 transition">Contacto</a> */}
        </div>

      </nav>
    </header>
  )
}
