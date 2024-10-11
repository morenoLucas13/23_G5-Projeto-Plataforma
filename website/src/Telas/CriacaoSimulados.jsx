import React, { useState } from 'react';
import BotaoRetornar from '../Imagens/botaoRetornar.png';
import BtnAdicionar from '../Imagens/BtnAdicionar.png'

import { useNavigate } from 'react-router-dom';

export default function CriacaoSimulados() {
    const navigate = useNavigate();
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
            "id": 3,
            "disciplina": "Biologia",
            "enunciado": "Qual das alternativas descreve corretamente a função das mitocôndrias nas células eucarióticas?"
        },
        {
            "id": 4,
            "disciplina": "Biologia",
            "enunciado": "Qual é a principal diferença entre a reprodução sexuada e assexuada nos seres vivos?"
        },
        {
            "id": 5,
            "disciplina": "Biologia",
            "enunciado": "Durante o processo de fotossíntese, qual é o papel do dióxido de carbono (CO₂)?"
        },
        {
            "id": 6,
            "disciplina": "Biologia",
            "enunciado": "Qual hormônio é responsável pela regulação dos níveis de glicose no sangue?"
        },
        {
            "id": 7,
            "disciplina": "Biologia",
            "enunciado": "Qual fenômeno explica o transporte de água das raízes até as folhas nas plantas?"
        }
    ];

    // Estado para controlar a visibilidade do quadrado
    const [isVisible, setIsVisible] = useState(false);

    // Função para alternar a visibilidade
    const toggleSquare = () => {
        setIsVisible(!isVisible);
    };


    return (
        <>
            <div className="header d-flex align-items-center justify-content-center">
                <button className="btnNave" onClick={() => navigate('/simuladosCriados')}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" />
                </button>
                <h1>Criar Simulados</h1>
            </div>

            {/* Tela Principal */}
            <div className="container mt-4">

                <button>bla bla bla</button>

                <input></input>
                <input></input>



                <div className="divider"></div>

                <h3>Questões Cadastradas:</h3>
                <div className="simulados-container">
                    {/* Loop para renderizar cada simulado */}
                    {questoes.map((questoes, index) => (
                        <div key={questoes.id}>
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

                                {/* Botões e Switch */}
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
            </div>
        </>
    );
}
