"use client";
import React, { useEffect, useState } from 'react';

export default function Contador() {
    const MIN = 0;
    const MAX = 10;

    const [valor, setValor] = useState<number>(() => {
        const salvo = localStorage.getItem("contador_valor");
        return salvo ? Number(JSON.parse(salvo)) : 0;
    });

    const [historico, setHistorico] = useState<number[]>(() => {
        const salvo = localStorage.getItem("contador_historico");
        if (salvo) {
            try {
                const parsed = JSON.parse(salvo);
                return Array.isArray(parsed) ? parsed.map(Number) : [];
            } catch {
                return [];
            }
        }
        return [];
    });

    // Salva no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("contador_valor", JSON.stringify(valor));
        localStorage.setItem("contador_historico", JSON.stringify(historico));
    }, [valor, historico]);

    const atualizarValor = (novo: number) => {
        const limitado = Math.min(MAX, Math.max(MIN, novo));
        setValor(limitado);
        setHistorico((prev) => [...prev, limitado]); // agora prev sempre é array
    };

    const cor = () => {
        if (valor <= 3) return "text-red-500";
        if (valor <= 7) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <div className="flex flex-col items-center gap-6 ">
            <h1 className={`text-6xl font-bold ${cor()}`}>{valor}</h1>

            <div className="flex gap-4">
                <button
                    onClick={() => atualizarValor(valor - 1)}
                    className="px-6 py-3 rounded-full  bg-amber-400 hover:bg-amber-500 font-semibold"
                    disabled={valor === MIN}
                >
                    -1
                </button>

                <button
                    onClick={() => atualizarValor(valor + 1)}
                    className="px-6 py-3 rounded-full shadow bg-blue-400 hover:bg-blue-500 font-semibold"
                    disabled={valor === MAX}
                >
                    +1
                </button>

                <button
                    onClick={() => atualizarValor(0)}
                    className="px-6 py-3 rounded-full shadow bg-red-400 hover:bg-red-500 text-white font-semibold"
                >
                    Reset
                </button>
            </div>

            <div className="w-full mt-6">
                <h3 className="text-lg font-semibold mb-2">Histórico</h3>
                <ul className="bg-gray-50 p-4 rounded-xl max-h-60 overflow-y-auto border">
                    {historico.length === 0 ? (
                        <li className="text-gray-500 italic">Nenhum registro ainda</li>
                    ) : (
                        historico.map((v, i) => (
                            <li key={i} className="py-1 border-b last:border-none text-neutral-700">
                                {i + 1}. {v}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}