"use client";

import React, { useState } from "react";

interface Tarefa {
  id: number;
  texto: string;
  categoria: string;
}

const categorias = [
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Design",
  "Outros",
];

export default function PaginaTarefas() {
  // Input em tempo real
  const [textoInput, setTextoInput] = useState("");

  // Seleção de categoria
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(categorias[0]);

  // Lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Para edição
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  // Adicionar nova tarefa
  const adicionarTarefa = () => {
    if (textoInput.trim() === "") return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
      texto: textoInput.trim(),
      categoria: categoriaSelecionada,
    };

    setTarefas((prev) => [...prev, novaTarefa]);
    setTextoInput(""); // limpa o input
  };

  // Apagar tarefa
  const apagarTarefa = (id: number) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  // Iniciar edição
  const iniciarEdicao = (tarefa: Tarefa) => {
    setEditandoId(tarefa.id);
    setTextoEdicao(tarefa.texto);
  };

  // Salvar edição
  const salvarEdicao = () => {
    if (textoEdicao.trim() === "" || editandoId === null) return;

    setTarefas((prev) =>
      prev.map((t) =>
        t.id === editandoId ? { ...t, texto: textoEdicao.trim() } : t
      )
    );
    setEditandoId(null);
    setTextoEdicao("");
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setTextoEdicao("");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Lista de Tarefas
        </h1>

        {/* Input em tempo real */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Digite algo:
          </label>
          <input
            type="text"
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escreva aqui..."
          />
          <p className="mt-4 text-lg text-gray-700">
            <strong>Você digitou:</strong>{" "}
            {textoInput || <span className="text-gray-400">nada ainda...</span>}
          </p>
        </div>

          {/* Selecionar categoria + botão adicionar */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Tarefa
                </label>
                <input
                  type="text"
                  value={textoInput}
                  onChange={(e) => setTextoInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="O que precisa fazer?"
                />
              </div>

              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={adicionarTarefa}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Adicionar
              </button>
            </div>
          </div>

          {/* Lista de tarefas */}
          <div className="space-y-4">
            {tarefas.length === 0 ? (
              <p className="text-center text-gray-500 py-12 bg-white rounded-xl shadow">
                Nenhuma tarefa ainda. Adicione a primeira!
              </p>
            ) : (
              tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="bg-white p-5 rounded-xl shadow flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    {editandoId === tarefa.id ? (
                      <input
                        type="text"
                        value={textoEdicao}
                        onChange={(e) => setTextoEdicao(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && salvarEdicao()}
                        className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {tarefa.texto}
                        </p>
                        <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tarefa.categoria}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editandoId === tarefa.id ? (
                      <>
                        <button
                          onClick={salvarEdicao}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelarEdicao}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => iniciarEdicao(tarefa)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => apagarTarefa(tarefa.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Apagar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
  );
}