"use client";

import React, { useState, useEffect } from "react";

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const [likes, setLikes] = useState(0);

  // Carrega do localStorage na montagem
  useEffect(() => {
    const salvo = localStorage.getItem(`likes_${title}`);
    if (salvo) {
      setLikes(Number(salvo));
    }
  }, [title]);

  // Salva sempre que mudar
  const curtir = () => {
    const novo = likes + 1;
    setLikes(novo);
    localStorage.setItem(`likes_${title}`, String(novo));
  };

  return (
    <button
      onClick={curtir}
      className="flex items-center gap-2 mt-3 px-4 py-2 bg-white text-violet-600 rounded-full font-semibold hover:bg-violet-100 transition shadow-md active:scale-95"
    >
      <span>{likes} {likes === 1 ? "curtida" : "curtidas"}</span>
    </button>
  );
}