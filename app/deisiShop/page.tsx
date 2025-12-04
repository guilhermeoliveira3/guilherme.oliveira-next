'use client'
import React from 'react'
import { Produto } from '@/models/interfaces'
import useSWR from 'swr'

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
    if (!data) return <p>desista dos seus sonhos e morra 🙊</p>
    return (
        <div className='flex flex-col justify-center items-center'>

            <h2 className='text-xl font-bold'>DeisiShop</h2>
            <div className='grid grid-cols-3'>
                {data?.map((product, i) => (
                    <article >
                        <h3>{product.title}</h3>
                        

                    </article>
                ))}
            </div>

        </div>
    )
}
