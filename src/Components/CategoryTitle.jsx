import React from 'react'

export default function CategoryTitle({name,image,description}) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl w-11/12 m-auto h-[30dvh] overflow-hidden">
        <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-bold">{name}</h1>
            <p className="text-lg">{description}</p>
        </div>
        <div className="absolute inset-0 bg-black/70 z-5" /> 
    </div>

  )
}
