// src/components/ProdutoDetalhe.tsx
import Image from 'next/image'
import { Produto } from '@/models/interfaces'

interface Props {
  produto: Produto
}

export default function ProdutoDetalhe({ produto }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Imagem grande */}
      <div className="relative h-96 md:h-full">
        {produto.image ? (
          <Image
            src={produto.image}
            alt={produto.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
        )}
      </div>

      {/* Detalhes */}
      <div className="p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{produto.title}</h1>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {produto.description || "Sem descrição disponível."}
        </p>

        <div className="space-y-4">
          <p className="text-5xl font-bold text-green-600">
            {Number(produto.price).toFixed(2)}€
          </p>

          <p className="text-sm text-gray-500">
            Categoria: <span className="font-medium">{produto.category}</span>
          </p>

          {produto.rating && (
            <p className="text-sm text-gray-500">
              Avaliação: <span className="font-medium">{produto.rating.rate} / 5 ({produto.rating.count} avaliações)</span>
            </p>
          )}
        </div>

        <button className="mt-10 w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}