import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoryBox({ name, link }) {
  return (
    <Link to={link} className="w-11/12">
      <div className="text-white cursor-pointer rounded-2xl bg-red-700 py-3 px-2 text-center hover:bg-red-400 transition-colors duration-300">
        {name}
      </div>
    </Link>
  );
}
