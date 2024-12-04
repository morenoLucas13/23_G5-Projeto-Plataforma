import React, { useState, useEffect } from 'react';
import estilos from './criarquestao.module.css';

import BotaoFechar from '../../../Imagens/BtnFechar.png';



export default function NovaQuestao({ questao, acaoAddNovaQuestao, acaoCancelar }) {
    const [texto, setTexto] = useState('');
    const [enunciado, setEnunciado] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState(null);

    // Atualiza os estados com os valores da questão ao iniciar ou ao editar
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
        }
    }, [questao]);

    // Define qual é a alternativa correta
    function definirCorreta(letra) {
        setAlternativaCorreta(letra); // Atualiza o estado
    }

    // Retorna os dados da questão atualizada
    function retornarQuestao() {
        if (!alternativaCorreta) {
            alert('Por favor, selecione uma alternativa correta.');
            return;
        }

        acaoAddNovaQuestao({
            id: questao?.id || undefined,
            texto,
            enunciado,
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE,
            alternativaCorreta,
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

            <textarea
                className={estilos.textbox}
                placeholder="ADICIONE O TEXTO AQUI..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <textarea
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
                                value={alternativa}
                                onChange={(e) => setAlternativa(e.target.value)}
                                className={estilos.formcontrol}
                                placeholder={`Adicionar Alternativa ${letra}`}
                            />
                            <button
                                className={`${estilos.botaocor} ${
                                    alternativaCorreta === letra ? estilos.botaoverde : estilos.botaovermelho
                                }`}
                                onClick={() => definirCorreta(letra)}
                            >
                            </button>
                        </div>
                    );
                })}
            </div>

            <button className={`${estilos.btnpersonalizado}`} onClick={retornarQuestao}>
                Adicionar
            </button>
        </div>
    );
}