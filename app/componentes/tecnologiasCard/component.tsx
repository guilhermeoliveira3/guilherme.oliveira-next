import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';

export default function TecnologiasCard() {
  return (
    <>
        {tecnologias.map((tech, index) => (
          <div key={index} className='flex flex-col p-2 m-2 justify-center items-center bg-violet-500 w-xl h-3xl rounded-xl'>
            <h3 className='text-2xl text-neutral-50'>{tech.title}</h3>
            <img 
              src={`/images/${tech.image}`} 
              alt={tech.title} 
              width={60}
            />
          </div>
        ))}
      </>
  )
}
