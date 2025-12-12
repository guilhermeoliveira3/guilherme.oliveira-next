import { Produto } from '@/models/interfaces'
import Link from 'next/link'

interface ProductCardProps {
    product: Produto
    quantidade: number
    removeFromCart: (id: number) => void  
}

export default function ProductCardOnCart({product, quantidade, removeFromCart} : ProductCardProps) {
    return (
        <article>
            <button
                onClick={() => removeFromCart(Number(product.id))}
                className='text-red-500 hover:text-red-700 font-bold text-lg'
            > X
            </button>
            <img src={`http:deisishop.pythonanywhere.com${product.image}`} alt={product.title} className='w-16 h-16 object-cover rounded-lg' />
            <div className='flex-1'>
                <p className='font-medium text-sm text-gray-700'>{product.title}</p>
                <p className='text-sm text-gray-700'>{quantidade} X {Number(product.price).toFixed(2)}€</p>
            </div>
            
        </article>
    )
}