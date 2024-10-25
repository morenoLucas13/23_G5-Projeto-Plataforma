import React, { useState } from 'react'
import estilos from '../../../Estilos/simulados.module.css';

import BotaoFechar from '../../../Imagens/BtnFechar.png';
import BtnAdicionar from '../../../Imagens/BtnAdicionar.png';



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

export default function AddQuestao({ acaoAddQuestao, acaoCancelar }) {
    const [listaQuestoes, setListaQuestoes] = useState(questoes);

    return (
        <>
            <div className={estilos.simuladoscontainer}>
                <div className={estilos.container}>
                    <div className={estilos.divInicio}>
                        <button className='btn' onClick={acaoCancelar}>
                            <img src={BotaoFechar} />
                        </button>
                    </div>
                    <h3>Questões cadastradas:</h3>
                    {listaQuestoes.map((questao, index) => (
                        <div key={index}>
                            <h5 className={estilos.materiatitulo}>{questao.disciplina}</h5>
                            <div className={`${estilos.simuladocard} d-flex align-items-center justify-content-between`}>
                                <div className={`${estilos.descricao} d-flex flex-column`}>
                                    <p className={estilos.descricaosimulado}>{questao.enunciado}</p>
                                </div>
                                <div className={estilos.divisor}></div>
                                <div className={`${estilos.botoesswitch} d-flex flex-column align-items-center`}>
                                    <button className="btn me-3 mt-2">
                                        <img src={BtnAdicionar} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
