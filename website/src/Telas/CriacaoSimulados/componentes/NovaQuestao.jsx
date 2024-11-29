import React, { useState } from 'react';
import estilos from './criarquestao.module.css';

import BotaoFechar from '../../../Imagens/BtnFechar.png';


export default function NovaQuestao({ acaoAddNovaQuestao, acaoCancelar }) {
    const [texto, setTexto] = useState('');
    const [enunciado, setEnunciado] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');

    const [alternativaCorreta, setAlternativaCorreta] = useState(null); // Estado para a alternativa correta

    function definirCorreta(alternativa) {
        setAlternativaCorreta(alternativa);
    }

    function retornarQuestao() {
        acaoAddNovaQuestao({
            enunciado,
            texto,
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE,
            alternativaCorreta
        });
    }

    return (
        <div className={estilos.container}>
            <div className={estilos.divInicio}>
                <button className='btn' onClick={acaoCancelar}>
                    <img src={BotaoFechar} />
                </button>

                {/* <CreatableSelect isClearable options={colourOptions} />; */}
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
                {[{
                    letra: 'A',
                    state: alternativaA,
                    setState: setAlternativaA
                },
                {
                    letra: 'B',
                    state: alternativaB,
                    setState: setAlternativaB
                },
                {
                    letra: 'C',
                    state: alternativaC,
                    setState: setAlternativaC
                },
                {
                    letra: 'D',
                    state: alternativaD,
                    setState: setAlternativaD
                },
                {
                    letra: 'E',
                    state: alternativaE,
                    setState: setAlternativaE
                }].map((x, index) => (
                    <div key={index} className={estilos.alternativa}>
                        <span className={estilos.alternativalabel}>{x.letra}.</span>
                        <textarea
                            value={x.state}
                            onChange={(e) => x.setState(e.target.value)} // Corrigir o onChange
                            className={estilos.formcontrol}
                            placeholder={`Adicionar Alternativa ${x.letra}`}/>
                        <button
                            className={`${estilos.botaocor} ${
                                alternativaCorreta === x.letra ? estilos.botaoverde : estilos.botaovermelho
                            }`}
                            onClick={() => definirCorreta(x.letra)}
                        ></button>
                    </div>
                ))}
            </div>

            <button className={`${estilos.btnpersonalizado}`} onClick={retornarQuestao}>
                Adicionar
            </button>
        </div>
    );
}