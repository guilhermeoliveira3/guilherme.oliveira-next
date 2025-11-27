const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ]

export default function Caracteristicas1() {
    return (
        <>
            {caracteristicas.map((caracteristica, i) => {
                return <li key={i}>{caracteristica}</li>
            })}
        </>
    )
}