import React, { useState, useEffect } from 'react';
import BotaoRetornar from '../../Imagens/botaoRetornar.png';
import BtnAdicionar from '../../Imagens/BtnAdicionar.png';
import { useNavigate } from 'react-router-dom';
import NovaQuestao from './componentes/NovaQuestao';
import estilos from '../../Estilos/simulados.module.css';
import MinhaModal from '../../Componentes/MinhaModal/MinhaModal'
import AddQuestao from './componentes/AddQuestao';

export default function CriacaoSimulados() {
    const navigate = useNavigate();
    const [showModalNovaQuestao, setShowModalNovaQuestao] = useState(false);
    const [showModalAddQuestao, setShowModalAddQuestao] = useState(false);

    function addicionarQuestaoDoBancoAoSimuladoAtual(obj) {
        setListaQuestoes([
            ...listaQuestoes,
            {
                id: listaQuestoes.length + 1,
                disciplina: "Biologia",
                ...obj
            }
        ]);
        setShowModalNovaQuestao(false); // Fecha a modal após adicionar a questão
    }

    function escodenModais() {
        setShowModalNovaQuestao(false);
        setShowModalAddQuestao(false);
    }

    return (
        <>
            <div className={`${estilos.header} align-items-center justify-content-center`}>
                <button className={estilos.btnNave} onClick={() => navigate('/simuladosCriados')}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" />
                </button>
                <h1>Criar Simulados</h1>
            </div>

            <div className={`${estilos.container}`}>
                <div className='d-flex justify-content-around'>
                    <button
                        className={`btn btn-primary mx-3 mb-3`}
                        onClick={() => setShowModalNovaQuestao(true)}>Criar nova questão</button>
                    <button
                        className={`btn btn-primary mx-3 mb-3`}
                        onClick={() => setShowModalAddQuestao(true)}>Adicionar do Banco</button>
                </div>

                {/* Renderiza a Modal */}
                <MinhaModal visivel={showModalNovaQuestao}>
                    <NovaQuestao
                        acaoAddNovaQuestao={addicionarQuestaoDoBancoAoSimuladoAtual}
                        acaoCancelar={() => escodenModais()}
                    />
                </MinhaModal>

                <MinhaModal visivel={showModalAddQuestao} >
                    <AddQuestao
                        acaoCancelar={() => escodenModais()}
                        acaoAddQuestao={addicionarQuestaoDoBancoAoSimuladoAtual} />
                </MinhaModal>

                <h3>Questões do Simulado:</h3>
                <div className={estilos.simuladoscontainer}>
                    {/* {listaQuestoes.map((questao, index) => (
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
                    ))} */}
                </div>
            </div>
        </>
    );
}