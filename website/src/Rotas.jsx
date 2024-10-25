import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './Home'
import Erro404 from './Erro404'
import Login from './Telas/Login/Login'
import Cadastro from './Telas/Login/Cadastro'
import Home from './Telas/Home'
import SimuladosCriados from './Telas/SimuladosCriados'
import CriacaoSimulados from './Telas/CriacaoSimulados/CriacaoSimulados'

export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/cadastro' element={<Cadastro/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/simuladosCriados' element={<SimuladosCriados/>} />
            <Route path='/criacao' element={<CriacaoSimulados/>} />

            {/* ============================================= */}
            
            <Route path='/*' element={<Erro404/>}/> 
        </Routes>
    </BrowserRouter>
  )
}
