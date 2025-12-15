// app/produtos/[id]/page.tsx
'use client'

import React from 'react'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import ProdutoDetalhe from '@/componentes/ProdutoDetalhe/ProdutoDetalhe'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Produto não encontrado')
  return res.json()
})

export default function PaginaProduto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  const id = resolvedParams.id

  const { data: produto, error, isLoading } = useSWR<Produto>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  )

  if (isLoading) return <p className="text-center py-20">Carregando produto...</p>
  if (error || !produto) return <>
        <p className="text-center text-red-500 p-4 bg-white m-4 rounded-xl font-semibold">Produto não encontrado</p>
        <Link href="/produtos" className='text-white hover:shadow-xl p-7 bg-amber-700 rounded-lg'>
            ← Voltar à lista de Produtos
        </Link>
    </>
  


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Link 
          href="/produtos" 
          className="inline-block mb-8 text-neutral-600 hover:underline font-medium px-7"
        >
          ← Voltar à lista de produtos
        </Link>
      <div className="max-w-6xl mx-auto px-6">
        

        <ProdutoDetalhe produto ={produto} />
      </div>
    </div>
  )
}