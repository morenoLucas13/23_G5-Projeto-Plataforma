import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import icoPessoa from '../../Imagens/IconePessoa.png';
import icoCadeado from '../../Imagens/IconeCadeado.png';
import icoEmail from '../../Imagens/IconeEmail.png';
import LogoApp from '../../Imagens/LogoDoApp.png';
import estilos from './Login.module.css';
import * as Yup from 'yup';
import api from '../../api/axiosConfig.js'

// === COMPONENTE === //
import InputLogECad from '../../Componentes/InputLogECad';

// Schema de validação do Yup
const cadastroSchema = Yup.object().shape({
  nome: Yup.string().required("O campo nome é obrigatório."),
  email: Yup.string().required('O campo email é obrigatório.').email('Email deve ser um endereço válido.'),
  senha: Yup.string().required('O campo senha é obrigatório.').min(7, 'A senha deve ter no mínimo 7 caracteres.'),
  nivel_acesso: Yup.number().required("O campo de nível de acesso é obrigatório.").oneOf([1, 2], "O nível de acesso deve ser 1 ou 2."),
  numeroMatricula: Yup.string().required('O número de matrícula é obrigatório.') // Validação para o número de matrícula
});

export default function Cadastro() {
  const [nome, setNome] = useState('Melissa Oliveira da Costa');
  const [email, setEmail] = useState('melissa.costa@portalsesisp.org.br');
  const [senha, setSenha] = useState('MMCC@4014');
  const [numeroMatricula, setNumeroMatricula] = useState('');
  const [papel, setPapel] = useState('');
  const [selecioneDisciplina, setSelecioneDisciplina] = useState([]);
  const [selecioneTurmas, setSelecioneTurmas] = useState('');
  const [informacoesPreenchidas, setInformacoesPreenchidas] = useState(false);

  const navigate = useNavigate();

  async function requisitaCadastro() {
    try {
      // Validando o Yup antes de enviar os dados
      await cadastroSchema.validate({ nome, email, senha, nivel_acesso, numeroMatricula });

      const response = await api.post('/api/login/cadastrarUser', {
        nome,
        email,
        senha,
        nivel_acesso,
        numeroMatricula,
        turma: selecioneTurmas, // Adiciona a turma selecionada
        disciplinas: selecioneDisciplina // Adiciona as disciplinas selecionadas
      });

      console.log('Cadastro bem-sucedido:', response);
    } catch (error) {
      console.log('Erro ao cadastrar:', error);
    }
  }

  // Lista de disciplinas
  const disciplinas = [
    'Biologia', 'Filosofia', 'Física', 'Geografia',
    'História', 'Inglês', 'Língua Portuguesa',
    'Matemática', 'Química', 'Sociologia'
  ];

  // Lista de turmas
  const turmas = [
    '3º Ensino Médio', '2º Ensino Médio', '1º Ensino Médio', '9º Ensino Fundamental II',
    '8º Ensino Fundamental II', '7º Ensino Fundamental II', '6º Ensino Fundamental II'
  ];

  // Abre a modal para escolher Aluno ou Professor e disciplinas
  const InformacoesAdicionais = async () => {
    if (informacoesPreenchidas) return; // Impede de clicar novamente se já preencheu as informações

    // Seleção de Professor ou Aluno
    const { value: selecioneSuaFuncao } = await Swal.fire({
      title: 'Quem está sendo cadastrado?',
      input: 'radio',
      inputOptions: {
        aluno: 'Aluno',
        professor: 'Professor',
      },
      inputValidator: (value) => {
        if (!value) return 'Você precisa escolher uma opção!';
      }
    });

    setPapel(selecioneSuaFuncao);

    // Se o usuário selecionou Professor, abre a seleção de disciplinas
    if (selecioneSuaFuncao === 'professor') {
      const { value: selecioneDisciplina } = await Swal.fire({
        title: 'Selecione as disciplinas que leciona',
        html: `
          ${disciplinas.map((discipline, index) =>
          `<div style="text-align:left;">
              <input type="checkbox" class="form-check-input" id="disciplina-${index}" value="${discipline}">
              <label for="disciplina-${index}" class="form-check-label">${discipline}</label>
            </div>`).join('')
          }`,
        preConfirm: () => {
          const selected = disciplinas.filter((_, index) => {
            const checkbox = document.getElementById(`disciplina-${index}`);
            return checkbox && checkbox.checked;
          });

          return selected.length ? selected : Swal.showValidationMessage('Selecione pelo menos uma disciplina');
        },
        confirmButtonText: 'Confirmar',
      });

      if (selecioneDisciplina) {
        setSelecioneDisciplina(selecioneDisciplina);
        console.log('Disciplinas selecionadas:', selecioneDisciplina);
        setInformacoesPreenchidas(true); // Atualiza para que o botão seja desabilitado
      }
    } else if (selecioneSuaFuncao === 'aluno') {
      // Para o aluno, agora será solicitado o número de matrícula e seleção de turmas
      const { value: numeroMatricula } = await Swal.fire({
        title: 'Informe o número da matrícula:',
        input: 'number',
        inputPlaceholder: 'Número de Matrícula',
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage('O número de matrícula é obrigatório');
          }
          return value;
        }
      });

      setNumeroMatricula(numeroMatricula);

      const { value: turmaSelecionada } = await Swal.fire({
        title: 'Selecione uma turma',
        html: `
          ${turmas.map((turma, index) =>
          `<div style="text-align:left;">
              <input type="radio" class="form-check-input" id="turma-${index}" name="turma" value="${turma}">
              <label for="turma-${index}" class="form-check-label">${turma}</label>
            </div>`).join('')
          }`,
        preConfirm: () => {
          const selectedTurma = turmas.find((_, index) => {
            const radio = document.getElementById(`turma-${index}`);
            return radio && radio.checked;
          });

          return selectedTurma ? selectedTurma : Swal.showValidationMessage('Selecione uma turma');
        },
        confirmButtonText: 'Confirmar',
      });

      if (numeroMatricula && turmaSelecionada) {
        setSelecioneTurmas(turmaSelecionada);
        console.log('Número da Matricula:', numeroMatricula, ', Turma selecionada:', turmaSelecionada);
        setInformacoesPreenchidas(true); // Atualiza para que o botão seja desabilitado
      }
    }
  };

  return (
    <div className={estilos.background}>
      <div className={estilos.container}>
        <img src={LogoApp} className={estilos.imagemLogo} alt="Logo do aplicativo" />

        <InputLogECad
          nome="Qual é o seu Nome?"
          titulo="Nome do usuário:"
          icon={icoPessoa}
          placeholder="Insira o seu nome"
          valor={nome}
          onChange={(evt) => setNome(evt)} />

        <InputLogECad
          nome="Passe o Email do Usuário"
          titulo="Email do usuário:"
          icon={icoEmail}
          placeholder="Insira o seu email"
          valor={email}
          onChange={(evt) => setEmail(evt)} />

        <InputLogECad
          nome="Crie sua Senha"
          titulo="Senha do usuário:"
          icon={icoCadeado}
          placeholder="Insira a sua senha"
          valor={senha}
          onChange={(evt) => setSenha(evt)} />

        {/* Botão que abre o alert de informações adicionais */}
        <button
          type="button"
          onClick={InformacoesAdicionais}
          className={estilos.btnInfo}
          disabled={informacoesPreenchidas}>
          Informações Adicionais
        </button>

        <div className={estilos.inputWrapper}>
          <button
            type="button"
            className={estilos.custombutton}
            onClick={requisitaCadastro}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}