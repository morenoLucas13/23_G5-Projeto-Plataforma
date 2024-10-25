import React, { useState, useEffect } from 'react';
import icoPessoa from '../../Imagens/IconePessoa.png';
import icoCadeado from '../../Imagens/IconeCadeado.png';
import LogoApp from '../../Imagens/LogoDoApp.png';
import { useNavigate } from 'react-router-dom';
import InputLogECad from '../../Componentes/InputLogECad';
import axios from 'axios';
import * as Yup from 'yup';
import estilos from './Login.module.css';

// Configurações globais do axios
axios.defaults.baseURL = "http://10.132.224.72:3901";
axios.defaults.timeout = 3000;

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("O email é obrigatório"),
    senha: Yup.string().min(7, "Senha deve ter pelo menos 7 caracteres").required("A senha é obrigatória")
});

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [resposta, setResposta] = useState("");
    const navigate = useNavigate();

    async function requisitaAutenticacao() {
        try {
            await loginSchema.validate({ email, senha });
            const response = await axios.post("/api/login", { email, senha });

            if (response.data.sucesso) {
                const { token, redefinirToken } = response.data;
                
                // Armazena o accessToken em sessionStorage e o refreshToken em localStorage
                sessionStorage.setItem("accessToken", token);
                localStorage.setItem("refreshToken", redefinirToken);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setResposta("Login realizado com sucesso!");
                navigate('/home');
            } else {
                setResposta(response.data.mensagem || "Erro ao logar.");
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setResposta(error.message);
            } else {
                console.log("Erro ao logar:", error);
                setResposta("Erro ao logar. Tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.background}>
            <div className={estilos.container}>
                <img src={LogoApp} className={estilos.imagemLogo} alt="Logo do aplicativo" />
                
                <InputLogECad
                    titulo="Email do usuário:"
                    icon={icoPessoa}
                    placeholder="Insira o seu email"
                    onChange={(evt) => setEmail(evt.target.value)}
                />

                <InputLogECad
                    titulo="Senha do usuário:"
                    icon={icoCadeado}
                    placeholder="Insira a sua senha"
                    onChange={(evt) => setSenha(evt.target.value)}
                />

                {resposta && <div className={estilos.error}>{resposta}</div>}

                <div>
                    <a className={estilos.link} onClick={() => navigate('/cadastro')} style={{ cursor: 'pointer' }}>
                        Você ainda não se CADASTROU?
                    </a>
                </div>

                <div className={estilos.inputWrapper}>
                    <button type="button" className={estilos.custombutton} onClick={requisitaAutenticacao}>
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
