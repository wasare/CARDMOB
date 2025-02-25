import { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0);

  // function updateCount() {
  //   setCount(count+1);
  // }

  // arraw function 

  const updateCount = () => {
    // outros comandos
    return count + 1;
  }

  const updateCount1 = () => count + 1; // return é implicito

  const dados = {
    "nome": "fulano",
    "atualiza": (novo_nome) => `Nome nome é ${novo_nome}`,
    "endereco": {
      "rua": "xyz",
      "numero": "111",
      "complementos": ["casa", "na esquina do supermercado ABC"]
    }

  }; // é um objeto JS
  dados.atualiza("gerson");
  dados.endereco.complementos[1]; // acessando a referência do endereço


  return (
    <>
      <Counter title="Contando..." />
      <Counter initial="100" />
    </>
  )
}

export default App
