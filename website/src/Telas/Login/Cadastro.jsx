import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import icoPessoa from '../../Imagens/IconePessoa.png';
import icoCadeado from '../../Imagens/IconeCadeado.png';
import icoEmail from '../../Imagens/IconeEmail.png';
import LogoApp from '../../Imagens/LogoDoApp.png';
import estilos from './Login.module.css';

// === COMPONENTE === //
import InputLogECad from '../../Componentes/InputLogECad';

export default function Cadastro() {
  const navigate = useNavigate();
  const [papel, setPapel] = useState('');
  const [selecioneDisciplina, setSelecioneDisciplina] = useState([]); // Disciplinas selecionadas

  // Lista de disciplinas
  const disciplines = [
    'Biologia', 'Filosofia', 'Física', 'Geografia',
    'História', 'Inglês', 'Língua Portuguesa',
    'Matemática', 'Química', 'Sociologia'
  ];

  // Abre a modal para escolher Aluno ou Professor e disciplinas
  const InformacoesAdicionais = async () => {
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
          ${disciplines.map((discipline, index) =>
          `<div style="text-align:left;">
              <input type="checkbox" class="form-check-input" id="disciplina-${index}" value="${discipline}">
              <label for="disciplina-${index}" class="form-check-label">${discipline}</label>
            </div>`
        ).join('')}
        `,
        preConfirm: () => {
          const selected = disciplines.filter((_, index) => {
            const checkbox = document.getElementById(`disciplina-${index}`);
            return checkbox && checkbox.checked;
          });

          return selected.length ? selected : Swal.showValidationMessage('Selecione pelo menos uma disciplina');
        },
        confirmButtonText: 'Confirmar',
      });

      if (selecioneDisciplina) {
        setSelecioneDisciplina(selecioneDisciplina);
        console.log('Disciplinas selecionadas:', selecioneDisciplina); // Exibe as disciplinas selecionadas no console
      }
    } else if (selecioneSuaFuncao === 'aluno') {
      Swal.fire('Cadastro como aluno selecionado!');
    }
  };

  return (
    <div className={estilos.background}>
      <div className={estilos.container}>
        <img src={LogoApp} className={estilos.imagemLogo} alt="Logo do aplicativo" />

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

        {/* Botão que abre o alert de informações adicionais */}
        <button
          type="button"
          onClick={InformacoesAdicionais}
          className={estilos.btnInfo}
        >
          Informações Adicionais
        </button>

        <div className={estilos.inputWrapper}>
          <button
            type="button"
            className={estilos.custombutton}
            onClick={() => navigate('/home')}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}