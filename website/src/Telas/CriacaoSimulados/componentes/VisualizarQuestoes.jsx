import React, { useState, useEffect } from 'react';
import estilos from './criarquestao.module.css';
import Select from 'react-select';

import BotaoFechar from '../../../Imagens/BtnFechar.png';

export default function VisualizarQuestoes({ questao, acaoCancelar }) {
    const [texto, setTexto] = useState('');
    const [enunciado, setEnunciado] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState(null);
    const [nivel, setNivel] = useState('');

    // Opções do Select
    const opcoesNivel = [
        { value: '15', label: 'Fácil' },
        { value: '10', label: 'Médio' },
        { value: '5', label: 'Difícil' },
    ];

    useEffect(() => {
        if (questao) {
            setTexto(questao.texto || '');
            setEnunciado(questao.enunciado || '');
            setAlternativaA(questao.alternativaA || '');
            setAlternativaB(questao.alternativaB || '');
            setAlternativaC(questao.alternativaC || '');
            setAlternativaD(questao.alternativaD || '');
            setAlternativaE(questao.alternativaE || '');
            setAlternativaCorreta(questao.alternativaCorreta || null);

            // Configura o nível com base na label recebida
            const nivelEncontrado = opcoesNivel.find(
                (opcao) => opcao.label === questao.nivel
            );
            setNivel(nivelEncontrado || '');
        }
    }, [questao]);

    return (
        <div className={estilos.container}>
            <div className={estilos.divInicio}>
                <button className="btn" onClick={acaoCancelar}>
                    <img src={BotaoFechar} alt="Fechar" />
                </button>
            </div>

            <h2 className={estilos.textcenter}>Visualizar Questão</h2>

            {/* Exibe o Select desabilitado */}
            <div className="mb-3">
                <label>Nível da Questão:</label>
                <Select
                    value={nivel}
                    options={opcoesNivel}
                    isDisabled={true}
                />
            </div>

            <textarea
                className={estilos.textbox}
                value={texto}
                readOnly
                placeholder="Texto de Apoio"
            />

            <textarea
                className={estilos.textbox}
                value={enunciado}
                readOnly
                placeholder="Enunciado"
            />

            <div>
                {['A', 'B', 'C', 'D', 'E'].map((letra, index) => {
                    const alternativa = {
                        A: alternativaA,
                        B: alternativaB,
                        C: alternativaC,
                        D: alternativaD,
                        E: alternativaE,
                    }[letra];

                    return (
                        <div key={index} className={estilos.alternativa}>
                            <span className={estilos.alternativalabel}>{letra}.</span>
                            <textarea
                                value={alternativa}
                                readOnly
                                className={estilos.formcontrol}
                                placeholder={`Alternativa ${letra}`}
                            />
                            <button
                                className={`${estilos.botaocor} ${alternativaCorreta === letra ? estilos.botaoverde : estilos.botaovermelho}`}
                                disabled
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
