import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Erro404 from './Erro404'
import Login from './Telas/Login'

export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />

            <Route path='/*' element={<Erro404/>}/> 
        </Routes>
    </BrowserRouter>
  )
}
