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
                {['A', 'B', 'C', 'D', 'E'].map((x, index) => (
                    <div key={index} className={estilos.alternativa}>
                        <span className={estilos.alternativalabel}>{x}.</span>
                        <textarea
                            className={estilos.formcontrol}
                            placeholder={`Adicionar Alternativa ${x}`}
                        />
                        <button
                            className={`${estilos.botaocor} ${alternativaCorreta === x ? estilos.botaoverde : estilos.botaovermelho}`}
                            onClick={() => definirCorreta(x)}
                        />
                    </div>
                ))}
            </div>

            <button className={`${estilos.btnpersonalizado}`} onClick={retornarQuestao}>Adicionar</button>
        </div>
    );
}