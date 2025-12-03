import React from 'react'
import {  FaInstagram, FaTiktok} from 'react-icons/fa'


export default function SocialSlideBar() {
   return (
    <div className="fixed top-1/3 right-4 flex flex-col gap-4 bg-white/35 shadow-lg rounded-full p-2 z-50">
      <a
        href="https://www.instagram.com/aceite_de_coco/"
        target="_blank"
        aria-label="Abrir Instagram"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-110"
      >
        <FaInstagram size={22} />
      </a>
      <a
        href="https://tiktok.com"
        target="_blank"
        aria-label="Abrir Tik Tok"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-700 transition-transform transform hover:scale-110"
      >
        <FaTiktok size={22} />
      </a>
    </div>
  );
}
