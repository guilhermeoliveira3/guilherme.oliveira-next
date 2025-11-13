import Componente1 from '@/componentes/componente1'

export default function page() {

  const magia = <p>Blablabla</p>
  const frase = 'frase bacana'

  return(
    <div>
      <h1>Eh molodoy ou num eh?</h1>
      <p>Eh molodoy</p>
      {magia}
      <p><strong>{frase}</strong></p>
      <Componente1/>
    </div>
  )
}