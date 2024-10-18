import React, { useEffect, useRef, useState } from 'react';
import BotaoRetornar from '../../Imagens/botaoRetornar.png';
import BtnAdicionar from '../../Imagens/BtnAdicionar.png'

import { useNavigate } from 'react-router-dom';
import NovaQuestao from './componentes/NovaQuestao';

const questoes = [
    {
        id: 1,
        disciplina: 'Biologia',
        enunciado: 'Para realizar seus experimentos, Mendel usou um organismo que apresenta curto tempo de geração. Que organismo foi esse?'
    },
    {
        id: 2,
        disciplina: 'Biologia',
        enunciado: 'Imagine que ratos pretos e brancos vivem em uma determinada região...'
    },
    {
        id: 3,
        disciplina: "Biologia",
        enunciado: "Qual das alternativas descreve corretamente a função das mitocôndrias nas células eucarióticas?"
    },
    {
        id: 4,
        disciplina: "Biologia",
        enunciado: "Qual é a principal diferença entre a reprodução sexuada e assexuada nos seres vivos?"
    },
    {
        id: 5,
        disciplina: "Biologia",
        enunciado: "Durante o processo de fotossíntese, qual é o papel do dióxido de carbono (CO₂)?"
    },
    {
        id: 6,
        disciplina: "Biologia",
        enunciado: "Qual hormônio é responsável pela regulação dos níveis de glicose no sangue?"
    },
    {
        id: 7,
        disciplina: "Biologia",
        enunciado: "Qual fenômeno explica o transporte de água das raízes até as folhas nas plantas?"
    }
];

const subTelaListarQuestoes = 1;
const subTelaCriarNova = 2;
const subTelaAddicionarExistente = 3;


export default function CriacaoSimulados() {
    const navigate = useNavigate();

    // Estado para controlar a visibilidade do quadrado
    const [isVisible, setIsVisible] = useState(false);
    const [listaQuestoes, setListaQuestoes] = useState(questoes);

    const [subTela, setSubTela] = useState(subTelaListarQuestoes);

    const btnAddFimLista = useRef(null)

    useEffect(() => {
        btnAddFimLista.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [listaQuestoes]);


    // Função para alternar a visibilidade
    const toggleSquare = () => {
        setIsVisible(!isVisible);
    };

    function addicionarQuestaoDoBancoAoSimuladoAtual(obj) {

        // setAcao('nova')

        // return;

        setListaQuestoes(
            [
                ...listaQuestoes,
                {
                    id: listaQuestoes.length + 1,
                    disciplina: "Biologia",
                    ...obj
                }
            ]
        )

        setSubTela(subTelaListarQuestoes)
    }


    return (
        <>
            {/* <div className="header d-flex align-items-center justify-content-center"> */}
            <div className="header">
                <button className="btnNave" onClick={() => navigate('/simuladosCriados')}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" />
                </button>
                <h1>Criar Simulados</h1>
            </div>

            {/* Tela Principal */}
            {/* <div className="container mt-4"> */}
            <div className="mt-4">

                {/* Botão que alterna a visibilidade do quadrado */}
                {/* <button 
                className='btn btn-primary'
                onClick={toggleSquare}>
                    {isVisible ? 'Esconder Quadrado' : 'Mostrar Quadrado'}
                </button> */}
                <button
                    className='btn btn-primary'
                    onClick={() => { setSubTela(subTelaCriarNova) }}>Criar nova questão</button>
                <button
                    className='btn btn-primary'
                    onClick={() => { setSubTela(subTelaAddicionarExistente) }}>Adicionar existente</button>

                {isVisible && (
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'blue',
                            marginTop: '20px',
                        }}
                    ></div>
                )}

                <div className="divider"></div>

                {subTela == subTelaCriarNova && (<NovaQuestao
                    acaoAddNovaQuestao={addicionarQuestaoDoBancoAoSimuladoAtual}
                    acaoCancelar={() => { setSubTela(subTelaListarQuestoes) }}

                />)}




                {/* componente addicionar questao do banco de questoes 
                  * ================================================== */}
                {subTela == subTelaListarQuestoes
                    && (
                        <>

                            <h3>Questões Cadastradas:</h3>
                            {/* <div className="simulados-container"> */}
                            <div className="">
                                {/* Loop para renderizar cada simulado */}
                                {listaQuestoes.map((questoes, index) => (
                                    <div key={index}>
                                        {/* Alinhamento à esquerda dos títulos das matérias */}
                                        <h5 className="materia-titulo">{questoes.disciplina}</h5>
                                        <div className="simulado-card d-flex align-items-center justify-content-between">
                                            {/* Texto e Descrição do Simulado */}
                                            <div className="descricao d-flex flex-column">
                                                <p className="descricao-simulado">
                                                    {questoes.enunciado}
                                                </p>
                                            </div>

                                            {/* Divisor Vertical */}
                                            <div className="divisor"></div>

                                            {/* Botões */}
                                            <div className="botoes-switch d-flex flex-column align-items-center">
                                                {/* Botão de Editar */}
                                                <button className="btn me-3 mt-2">
                                                    <img src={BtnAdicionar} alt="Ícone de Lápis" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                <button
                    className='btn btn-primary'
                    onClick={() => { setSubTela('nova') }}
                    ref={btnAddFimLista}>Add</button>
            </div>
        </>
    );
}