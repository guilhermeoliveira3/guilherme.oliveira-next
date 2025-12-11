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

    const [ordenacao, setOrdenacao] = useState<'nome-asc' | 'nome-desc' | 'preco-asc' | 'preco-desc'>('nome-asc')

    const [cart, setCart] = useState<Array<Produto & { quantity: number }>>([])

    useEffect(() => {
        localStorage.setItem('deisi-cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (produto: Produto) => {
        setCart(prev => {
            let jaExiste = false
            prev.forEach((i) => {
                if (i.id === produto.id) {
                    jaExiste = true
                }
            })
            if (jaExiste) {
                return prev.map(i =>
                    i.id == produto.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...produto, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(i => i.id !== id))
    }

    useEffect(() => {
        if (!data) {
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

    const produtosOrdenados = [...filteredData].sort((a, b) => {
        if (ordenacao === 'nome-asc') return a.title.localeCompare(b.title)
        if (ordenacao === 'nome-desc') return b.title.localeCompare(a.title)
        if (ordenacao === 'preco-asc') return Number(a.price) - Number(b.price)
        if (ordenacao === 'preco-desc') return Number(b.price) - Number(a.price)
        return 0
    })

    if (error) return <p>error.message</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data || data.length == 0) return <p>Não foi possível encontrar os produtos. Tente novamente!</p>


    return (
        <div className='flex flex-col justify-center items-center'>

            <h2 className='text-xl font-bold'>DeisiShop</h2>

            {/*inpt de busca */}
            <div className='w-full max-w-2xl mb-8'>
                <input type="text" placeholder='Pesquisar produto...' value={search} onChange={(input) => setSearch(input.target.value)}
                    className='w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-purple-300' />

            </div>

            {/*select ordenaçao*/}
            <select value={ordenacao} onChange={(o) => setOrdenacao(o.target.value as any)}
                className='p-5 text-lg text-neutral-600 border border-gray-300 rounded-full shadow bg-white'
            >
                <option value="nome-asc">Nome (A → Z)</option>
                <option value="nome-desc">Nome (Z → A)</option>
                <option value="preco-asc">Preço ascendente</option>
                <option value="preco-desc">Preço descendente</option>
            </select>

            <div className='grid grid-cols-3 gap-4 mt-2'>
                {produtosOrdenados?.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
            </div>

            {cart.length > 0 && (
                <div className='fixed right-6 bottom-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50'>
                    <h3 className='text-xl font-bold mb-4'>Carrinho ({cart.length})</h3>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map(item => (
                            <div>
                                <ProductCard key={item.id} product={item} />
                                <p>x {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
