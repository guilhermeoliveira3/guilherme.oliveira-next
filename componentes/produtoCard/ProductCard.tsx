import { Produto } from '@/models/interfaces'
import Link from 'next/link'

interface ProductCardProps {
    product: Produto
    onAddToCart: (produto: Produto) => void
}

export default function ProductCard({product, onAddToCart}: ProductCardProps) {
    return (
        <article className="flex flex-col items-center border rounded-lg p-4 shadow hover:shadow-xl transition-shadow max-w-[25vw] min-h-[100vh]">
            <h3 className='text-xl font-semibold'>{product.title}</h3>
            <img src={`http:deisishop.pythonanywhere.com${product.image}`} alt={product.title} className='w-[300] h-[300] object-cover rounded-md mb-4'/>
            
            <p className='text-gray-800 mt-2 text-l'> {product.description}</p>
            <p className='mt-auto mb-3'>Preço: {Number(product.price).toFixed(2)}€</p>
            <button onClick={() => onAddToCart?.(product)} className='bg-green-500 p-4 text-gray-50 mt-auto rounded-2xl'>Adicionar ao carrinho</button>

            <Link href={`/produtos/${product.id}`} className='p-4 bg-purple-600 twxt-white rounded-lg hover:bg-purple-purple-700 transition text-center'>
                + Info
            </Link>
        </article>
    )
}