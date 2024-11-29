import React, { useState, useEffect } from 'react';
import BotaoRetornar from '../../Imagens/botaoRetornar.png';
import BtnLixo from '../../Imagens/BtnLixo.png';
import { useNavigate } from 'react-router-dom';
import NovaQuestao from './componentes/NovaQuestao';
import MinhaModal from '../../Componentes/MinhaModal/MinhaModal'
import AddQuestao from './componentes/AddQuestao';
import api, { alertas, apiUtils } from '../../api/axiosConfig'

import estilos from '../../Estilos/simulados.module.css';

export default function CriacaoSimulados() {
    const navigate = useNavigate();
    const [listaQuestoes, setListaQuestoes] = useState([]);
    const [showModalNovaQuestao, setShowModalNovaQuestao] = useState(false);
    const [showModalAddQuestao, setShowModalAddQuestao] = useState(false);

    async function enviarSimuladorApi() {
        try {
            let listaProcessada = listaQuestoes.map((q) => (
                {
                    ...q,
                    nivel: 1,
                    disciplina_id: 3
                }
            ));

            let resp = await api.post('/api/adm/simulados/criarNovoSimulado', {
                turma_id: 1,
                descricao: "Simulado de Física Moderna",
                status: 1,
                disciplina_id: 3,
                questoes: listaProcessada,
            })

            if (apiUtils.ok(resp)) {

            } else {
                alertas.erro("Ops!", );
            }

        } catch (error) {

        }
    }

    /** adiciona uma questao escolhida nas existentes ao simulado atual */
    function addicionarQuestaoDoBancoAoSimuladoAtual(obj) {
        obj.disciplina_id = 3; // atribui a disciplina selecionada para o simulado
        setListaQuestoes([...listaQuestoes, obj]); // adiciona questão selecionada
        setShowModalNovaQuestao(false); // esconde modal
    }

    /**
     * Adiciona uma questao recem criado ao simulado atual
     * @param {} obj 
     */
    function addicionarQuestaoNovaAoSimuladoAtual(obj) {
        obj.id = undefined;
        obj.disciplina_id = 1;

        setListaQuestoes([...listaQuestoes, obj]);
        setShowModalNovaQuestao(false);
    }

    function removerQuestao(id) {
        setListaQuestoes(listaQuestoes.filter(questao => questao.id !== id));
    }

    function escodenModais() {
        setShowModalNovaQuestao(false);
        setShowModalAddQuestao(false);
    }

    return (
        <>
            <div className={`${estilos.header} d-flex align-items-center justify-content-center`}>
                <button className={estilos.btnNave} onClick={() => navigate('/simuladosCriados')}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" />
                </button>
                <h1>Criar Simulados</h1>
            </div>

            <div className={`${estilos.container}`}>
                <div className='d-flex justify-content-around mt-3'>
                    <button
                        className={`${estilos.btnpersonalizado}`}
                        onClick={() => setShowModalNovaQuestao(true)}>Criar nova questão</button>
                    <button
                        className={`${estilos.btnpersonalizado}`}
                        onClick={() => setShowModalAddQuestao(true)}>Adicionar do Banco</button>
                </div>

                {/* Modal de criação de questão */}
                <MinhaModal visivel={showModalNovaQuestao}>
                    <NovaQuestao
                        acaoAddNovaQuestao={addicionarQuestaoNovaAoSimuladoAtual}
                        acaoCancelar={() => escodenModais()}
                    />
                </MinhaModal>

                {/* Modal para escolher e adicionar uma questão existente ao simulado */}
                <MinhaModal visivel={showModalAddQuestao} >
                    <AddQuestao
                        acaoCancelar={() => escodenModais()}
                        acaoAddQuestao={addicionarQuestaoDoBancoAoSimuladoAtual} />
                </MinhaModal>

                <h2>Questões já adicionadas no Simulado</h2>

                <div className={`${estilos.divider} mt-3 mb-3`} />

                <h4>Questões selecionadas: {listaQuestoes.length}</h4>

                <div className={estilos.simuladoscontainer}>
                    {listaQuestoes.map((questao, index) => (
                        <div key={index}>
                            <h5 className={estilos.materiatitulo}>{questao.disciplina}</h5>
                            <div className={`${estilos.simuladocard} d-flex align-items-center justify-content-between`}>
                                <div className={`${estilos.descricao} d-flex flex-column`}>
                                    <p className={estilos.descricaosimulado}>{questao.enunciado}</p>
                                </div>

                                <div className={estilos.divisor}></div>
                                <div className={`${estilos.botoesswitch} d-flex flex-column align-items-center`}>
                                    <button className={`${estilos.btnLixo} btn`} onClick={() => removerQuestao(questao.id)}>
                                        <img src={BtnLixo} alt="Remover Questão" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className={`btn btn-primary`}
                    onClick={enviarSimuladorApi}>Criar Simulado</button>
            </div>
        </>
    );
}