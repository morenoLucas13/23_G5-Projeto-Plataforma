import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import icoPessoa from '../../Imagens/IconePessoa.png';
import icoCadeado from '../../Imagens/IconeCadeado.png';
import icoEmail from '../../Imagens/IconeEmail.png'
import LogoApp from '../../Imagens/LogoDoApp.png';

import InputLogECad from '../../Componentes/InputLogECad';

import estilos from './Login.module.css'


export default function Cadastro() {
  return (
    <>
      <div className={estilos.background}>
        <div className={estilos.container}>
          <div>
            <img src={LogoApp} className={estilos.imagemLogo} />
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

          <div className={estilos.inputWrapper}>
            <button type="button" className={estilos.custombutton} onclick="window.location.href='./home.html';">Cadastrar</button>
          </div>
        </div>
      </div>
    </>
  )
}
