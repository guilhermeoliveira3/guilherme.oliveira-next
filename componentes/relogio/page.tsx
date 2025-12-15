'use client'

import React, { useState, useEffect } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Limpa o intervalo quando o componente desmontar
    return () => clearInterval(timer);
  }, []);


  if (!hora) {
    return (
      <div className="text-center text-sm text-gray-600">
        <div className="font-mono text-xl font-bold text-gray-800">
          --:--:--
        </div>
        <div className="capitalize">Carregando...</div>
      </div>
    );
  }

  const formatarHora = (date: Date) => {
    return date.toLocaleTimeString("pt", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatarData = (date: Date) => {
    return date.toLocaleDateString("pt", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="text-center text-sm text-gray-600">
      <div className="font-mono text-xl font-bold text-gray-800">
        {formatarHora(hora)}
      </div>
      <div className="capitalize">
        {formatarData(hora)}
      </div>
    </div>
  );
}