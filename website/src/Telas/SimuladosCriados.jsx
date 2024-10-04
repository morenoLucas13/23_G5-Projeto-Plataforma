import React from 'react';
import BotaoRetornar from '../Imagens/botaoRetornar.png';
import IconeLapis from '../Imagens/IconeLapis.png';

import { useNavigate } from 'react-router-dom';

export default function SimuladosCriados() {
    // Dados de exemplo para simulados
    const simulados = [
        { id: 1, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
        { id: 2, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
        { id: 3, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
        { id: 4, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
        { id: 5, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
        { id: 6, materia: 'Biologia', descricao: 'Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado / Descrição do Simulado...' },
    ];

    const navigate = useNavigate();


    return (
        <>
            {/* Cabeçalho da página */}
            <div className="header d-flex align-items-center justify-content-center">
                <button className="btnNave">
                    <img src={BotaoRetornar} alt="Botão de Retorno" onClick={() => navigate('/home')} />
                </button>
                <h1>Simulados Criados</h1>
            </div>

            {/* Container Principal */}
            <div className="container mt-4">
                <button className="btn mb-4 btn-personalizado">Criar Novo Simulado</button>

                <div className="simulados-container">
                    {/* Loop para renderizar cada simulado */}
                    {simulados.map((simulado, index) => (
                        <div key={simulado.id}>
                            {/* Alinhamento à esquerda dos títulos das matérias */}
                            <h5 className="materia-titulo">{simulado.materia}</h5>
                            <div className="simulado-card d-flex align-items-center justify-content-between">
                                {/* Texto e Descrição do Simulado */}
                                <div className="descricao d-flex flex-column">
                                    <p className="descricao-simulado">
                                        {simulado.descricao}
                                    </p>
                                </div>

                                {/* Divisor Vertical */}
                                <div className="divisor"></div>

                                {/* Botões e Switch */}
                                <div className="botoes-switch d-flex flex-column align-items-center">
                                    {/* Componente de Switch */}
                                    <div>
                                        <input type="checkbox" id={`switch${index}`} className="switch-checkbox" />
                                        <label htmlFor={`switch${index}`} className="switch-label"></label>
                                    </div>

                                    {/* Botão de Editar */}
                                    <button className="btn me-3 mt-2">
                                        <img src={IconeLapis} alt="Ícone de Lápis" />
                                    </button>

                                    {/* Número de Questões */}
                                    <span className="numero-questoes mt-2">16</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}