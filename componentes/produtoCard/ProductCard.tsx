import { Produto } from '@/models/interfaces'

interface ProductCardProps {
    product: Produto
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <article className="flex flex-col items-center border rounded-lg p-4 shadow hover:shadow-xl transition-shadow max-w-[25vw] min-h-[100vh]">
            <h3 className='text-xl font-semibold'>{product.title}</h3>
            <img src={`http:deisishop.pythonanywhere.com${product.image}`} alt={product.title} className='w-[300] h-[300] object-cover rounded-md mb-4'/>
            
            <p className='text-gray-800 mt-2 text-l'> {product.description}</p>
            <p className='mt-auto mb-3'>Preço: {Number(product.price).toFixed(2)}€</p>
            <p className='bg-green-500 p-4 text-gray-50 mt-auto rounded-2xl'>Adicionar ao carrinho</p>
        </article>
    )
}