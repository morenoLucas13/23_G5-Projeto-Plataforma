import React, { useState } from 'react';
import icoPessoa from '../Imagens/IconePessoa.png';
import icoCadeado from '../Imagens/IconeCadeado.png';
import LogoApp from '../Imagens/LogoDoApp.png';
import { useNavigate } from 'react-router-dom';
import InputLogECad from '../Componentes/InputLogECad';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const nav = useNavigate();

    function NavegarParaCadastro() {
        nav('/cadastro');
    }

    function evtLogin() {
        nav('/home');
    }

    return (
        <>
            <div className="background">
                <div className="container">
                    <div>
                        <img src={LogoApp} className="imagemLogo" alt="Logo do aplicativo" />
                    </div>

                    <InputLogECad
                        titulo="Email do usuário:"
                        icon={icoPessoa}
                        placeholder="Insira o seu email"
                    />

                    <InputLogECad
                        titulo="Senha do usuário:"
                        icon={icoCadeado}
                        placeholder="Insira a sua senha"
                    />

                    {/* 
                <div className="inputWrapper">
                    <h6 className="titulo">Email do usuário:</h6>
                    <div className="inputContainer">
                        <img src={icoPessoa} className="emoji" alt="emojiEmail" />
                        <input
                            type="text"
                            className="inputTexto"
                            placeholder="Insira o seu email"
                            value={email}
                            onChange={(evt) => { setEmail(evt.target.value) }}
                        />
                    </div>
                    <div className="divider"></div>
                </div>

                <div className="inputWrapper">
                    <h6 className="titulo">Senha do usuário:</h6>
                    <div className="inputContainer">
                        <img src={icoCadeado} className="emoji" alt="emojiSenha" />
                        <input
                            type="text"
                            className="inputTexto"
                            placeholder="Insira a sua senha"
                            value={senha}
                            onChange={(evt) => { setSenha(evt.target.value) }}
                        />
                    </div>
                    <div className="divider"></div>
                </div>
                */}

                    <div>
                        {/* Substituí o `href` por `onClick` para navegação interna */}
                        <a className="link" onClick={NavegarParaCadastro} style={{ cursor: 'pointer' }}>
                            Você ainda não se CADASTROU?
                        </a>
                    </div>

                    <div className="inputWrapper">
                        <button type="button" className="custom-button" onClick={evtLogin}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}