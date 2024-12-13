// Como posso fazer para armazenar também o nível da questão e passar para a modal de visualizar

import React, { useState, useEffect } from 'react';
import estilos from './criarquestao.module.css';
import Select from 'react-select';


import BotaoFechar from '../../../Imagens/BtnFechar.png';



export default function NovaQuestao({ acaoAddNovaQuestao, acaoCancelar }) {
    const [texto, setTexto] = useState('');
    const [enunciado, setEnunciado] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState(null);

    const [selecionarOpcao, setSelecionarOpcao] = useState(null);

    // Definição das opções para o Select
    const opcoes = [
        { value: '15', label: 'Fácil' },
        { value: '10', label: 'Médio' },
        { value: '5', label: 'Díficil' }
    ];

    const carregarEscolhas = (opcaoSelecionada) => {
        setSelecionarOpcao(opcaoSelecionada); // Atualiza o estado com a opção selecionada
    };

    // Define qual é a alternativa correta
    function definirCorreta(letra) {
        setAlternativaCorreta(letra); // Atualiza o estado
    }

    // Retorna os dados da questão atualizada
    function retornarQuestao() {
        if (!alternativaCorreta || !selecionarOpcao) {
            return;
        }

        acaoAddNovaQuestao({
            texto,
            enunciado,
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE,
            alternativaCorreta,
            nivel: selecionarOpcao.label, // Adiciona o nível
        });
    }


    return (
        <div className={estilos.container}>
            <div className={estilos.divInicio}>
                <button className="btn" onClick={acaoCancelar}>
                    <img src={BotaoFechar} alt="Fechar" />
                </button>
            </div>

            <h2 className={estilos.textcenter}>Adicione sua própria questão</h2>

            <div className={`mb-3`}>
                <label>Nível da Questão:</label>
                <Select
                    value={selecionarOpcao}
                    onChange={carregarEscolhas}
                    options={opcoes}
                    placeholder="Selecione o nível da questão"
                />
            </div>

            <textarea
                name='Texto de Apoio para a Questão'
                className={estilos.textbox}
                placeholder="ADICIONE O TEXTO AQUI..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <textarea
                name='Enunciado para a Questão'
                className={estilos.textbox}
                placeholder="ADICIONE O ENUNCIADO AQUI..."
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
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

                    const setAlternativa = {
                        A: setAlternativaA,
                        B: setAlternativaB,
                        C: setAlternativaC,
                        D: setAlternativaD,
                        E: setAlternativaE,
                    }[letra];

                    return (
                        <div key={index} className={estilos.alternativa}>
                            <span className={estilos.alternativalabel}>{letra}.</span>
                            <textarea
                                name='Alternativas'
                                value={alternativa}
                                onChange={(e) => setAlternativa(e.target.value)}
                                className={estilos.formcontrol}
                                placeholder={`Adicionar Alternativa ${letra}`}
                            />
                            <button
                                className={`${estilos.botaocor} ${alternativaCorreta === letra ? estilos.botaoverde : estilos.botaovermelho
                                    }`}
                                onClick={() => definirCorreta(letra)}
                            >
                            </button>
                        </div>
                    );
                })}
            </div>

            <div>
                <button className={`${estilos.btnpersonalizado}`} onClick={retornarQuestao}>
                    Adicionar
                </button>
            </div>
        </div>
    );
}