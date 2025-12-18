import { Link } from 'react-router-dom'
import slugify from '../utils/slugify'

export default function BlogCard({post}) {
  return (
    <div  className="cursor-pointer relative w-80  h-64 rounded-xl overflow-hidden shadow-lg group">
      <Link
        to={`/ideas/${slugify(post.title)}`}
        state={{
          post,
          from: window.location.pathname + window.location.search
        }}
      >
      {/* Imagen */}
      <img
        src={post.image}
        alt="blog"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-800"
      />

      {/* Overlay con blur abajo */}
      <div className="
        absolute bottom-0  w-11/12 rounded-2xl ml-3 
        bg-gradient-to-r from-sky-500/20 to-rose-500/30 backdrop-blur-md
        px-4 py-1  text-white
        transition-all duration-300
      ">
        <p className="text-lg font-semibold">{post.title}</p>
        <p className="text-sm opacity-80">{post.type}</p>
      </div>
      </Link>
    </div>
  )
}
