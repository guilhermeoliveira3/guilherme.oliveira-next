'use client'
import React, { useState, useEffect } from 'react'
import { Produto } from '@/models/interfaces'
import useSWR from 'swr'
import ProductCard from '@/componentes/produtoCard/ProductCard'


const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Erro: $(res.statusText)`)
    }

    return res.json()
}

export default function page() {
    const url = "https://deisishop.pythonanywhere.com/products"

    const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)


    if (error) return <p>error.message</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data || data.length == 0) return <p>Não foi possível encontrar os produtos. Tente novamente!</p>
    return (
        <div className='flex flex-col justify-center items-center'>

            <h2 className='text-xl font-bold'>DeisiShop</h2>
            <div className='grid grid-cols-3 gap-4 mt-2'>
                {data?.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>

        </div>
    )
}
