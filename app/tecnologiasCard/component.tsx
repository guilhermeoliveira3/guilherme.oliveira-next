import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import ContadorPersonalizado from './contadorPersonalizado';

export default function TecnologiasCard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
      {tecnologias.map((tech) => (
        <div
          key={tech.title}
          className="flex flex-col items-center justify-between p-6 bg-violet-600 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">{tech.title}</h3>
            <img
              src={`/images/${tech.image}`}
              alt={tech.title}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>

          {/* Contador de likes */}
          <ContadorPersonalizado title={tech.title} />
        </div>
      ))}
    </div>
  );
}