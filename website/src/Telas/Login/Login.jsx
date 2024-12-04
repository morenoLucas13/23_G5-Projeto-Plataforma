import React, { useEffect, useState } from 'react';
import icoPessoa from '../../Imagens/IconePessoa.png';
import icoCadeado from '../../Imagens/IconeCadeado.png';
import LogoApp from '../../Imagens/LogoDoApp.png';
import { useNavigate } from 'react-router-dom';
import InputLogECad from '../../Componentes/InputLogECad';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import api from '../../api/axiosConfig'

import estilos from './Login.module.css';


// Schema de validação com Yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email("O email é inválido").required("O email é obrigatório"),
  senha: Yup.string().min(7, "A senha deve ter pelo menos 7 caracteres").required("A senha é obrigatória")
});

export default function Login() {
  const [email, setEmail] = useState("rodrigo.casa@portalsesisp.org.br");
  const [senha, setSenha] = useState("Sesisp@1234");
  const [loading, setLoading] = useState(false);
  const [ocultarSenha, setOcultarSenha] = useState(true);
  const [valueLS, setValueLS] = useState()

  const navigate = useNavigate();

  async function requisitaAutenticacao() {
    setLoading(true);

    try {
      // Validação com Yup antes de enviar os dados
      await loginSchema.validate({ email, senha });

      const response = await api.post("/api/login", { email, senha });

      if (response && response.data && response.data.token) {
        const { token } = response.data;

        // Armazenando o token no localStorage
        localStorage.setItem("token", token);

        // Navega para a tela 'home' após login bem-sucedido
        navigate("/home");
        return;
      }

      throw new Error("Resposta inesperada do servidor.");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Erro de validação do Yup
        Swal.fire({
          icon: "error",
          title: "Erro de validação",
          text: error.message, // Mensagem do Yup
        });
      } else if (error.response && error.response.data && error.response.data.message) {
        // Erro de resposta do servidor
        Swal.fire({
          icon: "error",
          title: "Erro de autenticação",
          text: error.response.data.message,
        });
      } else {
        // Erro genérico de autenticação
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Falha na autenticação. Verifique suas credenciais e tente novamente!",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function getData() {
    const resultado = await localStorage.getItem("token")

    if (resultado) {
      setValueLS(resultado)
    }
  }

  // Configurando para assim que carregar a tela, buscar os valores armazenados no localStorage
  useEffect(() => { getData() }, [])

  return (
    <div className={estilos.background}>
      <div className={estilos.container}>
        <img src={LogoApp} className={estilos.imagemLogo} alt="Logo do aplicativo" />

        <InputLogECad
          titulo="Email do usuário:"
          icon={icoPessoa}
          placeholder="Insira o seu email"
          valor={email}
          onChange={(evt) => setEmail(evt)}
        />

        <InputLogECad
          titulo="Senha do usuário:"
          icon={icoCadeado}
          placeholder="Insira a sua senha"
          valor={senha}
          onChange={(evt) => setSenha(evt)}
          secureTextEntry={ocultarSenha}
          tipo={"password"}
        />

        <div>
          <a className={estilos.link} onClick={() => navigate('/cadastro')} style={{ cursor: 'pointer' }}>
            Você ainda não se CADASTROU?
          </a>
        </div>

        <div className={estilos.inputWrapper}>
          <button
            type="button"
            className={estilos.custombutton}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                requisitaAutenticacao();
              }, 1000);
            }}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}