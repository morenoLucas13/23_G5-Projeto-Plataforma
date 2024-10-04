import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

export default function Home() {
  const [count, setCount] = useState(0)
  const [listaSimulados, setListaSimulados] = useState(null)

  const nav = useNavigate();

  async function acaoLogin() {
    try {
      let resposta = await axios.get("/api/simulados/agendados")
      setListaSimulados(resposta.data.simulados)
    } catch (error) {

    }



    // setMsg("ola")
    console.log('Navegando login')
    // nav('/login');

  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={acaoLogin}>vai pra login</button>
      {listaSimulados
        &&
        (<div>
          {
            listaSimulados
              .map((item, posItem) =>
              (<div key={posItem}>
                <h1>
                  {item.professor}
                </h1>
                <div>{item.descricao}</div>
                <div>{dayjs(item.data_criacao).format('DD/MM/YYYY')}</div>
              </div>))
          }
        </div>)
      }
    </>
  )
}


