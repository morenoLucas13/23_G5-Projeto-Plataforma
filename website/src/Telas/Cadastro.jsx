import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import icoPessoa from '../Imagens/IconePessoa.png';
import icoCadeado from '../Imagens/IconeCadeado.png';
import icoEmail from '../Imagens/IconeEmail.png'
import LogoApp from '../Imagens/LogoDoApp.png';

import InputLogECad from '../Componentes/InputLogECad';

export default function Cadastro() {
  return (
    <>
      <div className="background">
        <div className="container">
          <div>
            <img src={LogoApp} className="imagemLogo" />
          </div>

          <InputLogECad
            titulo="Nome do usuário:"
            icon={icoPessoa}
            placeholder="Insira o seu nome"
          />

          <InputLogECad
            titulo="Email do usuário:"
            icon={icoEmail}
            placeholder="Insira o seu email"
          />

          <InputLogECad
            titulo="Senha do usuário:"
            icon={icoCadeado}
            placeholder="Insira a sua senha"
          />

          <div className="inputWrapper">
            <button type="button" className="custom-button" onclick="window.location.href='./home.html';">Cadastrar</button>
          </div>
        </div>
      </div>
    </>
  )
}
