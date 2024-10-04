import React, { useState } from 'react'
import icoPessoa from './Imagens/IconePessoa.png'
import icoCadeado from './Imagens/IconeCadeado.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [msg, setMsg] = useState('')

    const nav = useNavigate();


    function evtLogin() {
        // setMsg("ola")
        console.log('Navegando')
        nav('/');
    }

    return (
        <div className="container">
            <div>
                <img src="../Imagens/LogoDoApp.png" className="imagemLogo" />
            </div>

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
                    <input type="text" className="inputTexto" id="" placeholder="Insira a sua senha"
                        value={senha}
                        onChange={(evt) => { setSenha(evt.target.value) }} />
                </div>
                <div className="divider"></div>
            </div>

            <div>
                <a className="link" href="./Telas/cadastro.html">Você ainda não se CADASTROU?</a>
            </div>

            <div className="inputWrapper">
                <button type="button" className="custom-button" onClick={evtLogin}>Entrar</button>
            </div>
            <div>{msg}</div>
        </div>
    )
}
