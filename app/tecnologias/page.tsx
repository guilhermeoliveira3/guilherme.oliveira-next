import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';

export default function Page() {
  return (
    <div>
      <h2>Tecnologias exploradas</h2>

      <ul>
        {tecnologias.map((tech, index) => (
          <li key={index}>
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <p><strong>Rating:</strong> {tech.rating}/5</p>
    
          </li>
        ))}
      </ul>
    </div>
  )
}
