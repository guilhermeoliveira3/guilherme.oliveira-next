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

    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<Produto[]>([])

    useEffect(() => {
        if(!data) {
            setFilteredData([])
            return 
        }

        if (search.trim() === '') {
            setFilteredData(data)   //se input vazio mostra tudo ;)
        } else {
            const filtrados = data.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredData(filtrados)
        }
    }, [search, data])

    if (error) return <p>error.message</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data || data.length == 0) return <p>Não foi possível encontrar os produtos. Tente novamente!</p>


    return (
        <div className='flex flex-col justify-center items-center'>

            <h2 className='text-xl font-bold'>DeisiShop</h2>

            <div className='w-full max-w-2xl mb-8'>
                <input type="text" placeholder='Pesquisar produto...' value={search} onChange={(input) => setSearch(input.target.value)} 
                className='w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-purple-300'/>

            </div>

            <div className='grid grid-cols-3 gap-4 mt-2'>
                {filteredData?.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>

        </div>
    )
}
