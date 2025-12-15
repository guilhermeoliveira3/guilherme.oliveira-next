'use client'
import React, { useState, useEffect } from 'react'
import { Produto } from '@/models/interfaces'
import useSWR from 'swr'
import ProductCard from '@/componentes/produtoCard/ProductCard'
import ProductCardOnCart from '@/componentes/productCardOnCart/productCardOnCart'


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

    const [isEstudanteDeisi, setIsEstudanteDeisi] = useState(false)
    const [cupom, setCupom] = useState('')

    const [isCartOpen, setIsCartOpen] = useState(false);

    const [purchaseResult, setPurchaseResult] = useState<{ totalCost: string; reference: string; message: string; error: string } | null>(null);

    useEffect(() => {
        localStorage.setItem('deisi-cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (produto: Produto) => {
        setIsCartOpen(true)
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

    const buy = async () => {
        if (cart.length === 0) {
            alert('Adicione produtos ao carrinho para comprar!')
            return
        }


        try {
            const productsIds: number[] = []
            cart.forEach(p => {
                for (let i = 0; i < p.quantity; i++) {
                    productsIds.push(p.id)
                }
            })

            const requestBody = {
                products: productsIds,
                name: "",
                student: isEstudanteDeisi,
                coupon: cupom || ""
            }

            const response = await fetch("https://deisishop.pythonanywhere.com/buy", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Erro na compra')
            }

            const result = await response.json()
            setPurchaseResult(result);
            setCart([])
            setCupom('')
            setIsEstudanteDeisi(false);

        } catch {
            console.log("Erro ao comprar")
        }
    }

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

            {(!isCartOpen) && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed right-6 bottom-6 z-50 bg-blue-600 text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center text-3xl font-bold hover:bg-blue-700 transition transform hover:scale-110"
                >
                    🛒
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                </button>
            )}

            {(isCartOpen) && (
                <div className='fixed right-6 bottom-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50'>
                    <div className='relative mb-4'>
                        <h3 className='text-xl font-bold mb-4 text-gray-600'>Carrinho ({cart.length})</h3>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            className='absolute -top-2 -right-2  text-red-800 font-semibold text-lg'
                        >X</button>
                    </div>


                    <div className='space-y-4 mb-4 p-4 bg-gray-50 rounded-lg'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" checked={isEstudanteDeisi} onChange={(e) => setIsEstudanteDeisi(e.target.checked)} className='rounded' />
                            <span className='text-sm text-gray-600'>Estudante DEISI?</span>
                        </label>

                        <input
                            type="text"
                            placeholder='Cupom de desconto'
                            value={cupom}
                            onChange={(e) => setCupom(e.target.value.toUpperCase())}
                            className='w-full p-3 border border-gray-300 rounded-lg text-gray-600' />
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map(item => (
                            <div key={item.id}>
                                <ProductCardOnCart product={item} quantidade={item.quantity} removeFromCart={removeFromCart} />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={buy}
                        disabled={cart.length === 0}
                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cart.length === 0 ? 'Carrinho vazio' : 'Comprar'}
                    </button>

                    {purchaseResult && (
                        <div className='mt-4 p-4 bg-green-50 rounded-lg text-green-800'>
                            <h4 className="font-bold"> Compra realizada com sucesso!</h4>
                            <p>Total: {Number(purchaseResult.totalCost).toFixed(2)}€</p>
                            <p>Referencia para pagamento: {purchaseResult.reference}</p>
                            <p>{purchaseResult.message}</p>
                        </div>
                    )}

                </div>
            )}


        </div>
    )
}
