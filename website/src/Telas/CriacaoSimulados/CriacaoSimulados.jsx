import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BotaoRetornar from '../../Imagens/botaoRetornar.png';
import { useNavigate } from 'react-router-dom';

import NovaQuestao from './componentes/NovaQuestao';
import MinhaModal from '../../Componentes/MinhaModal/MinhaModal'
import VisualizarQuestoes from './componentes/VisualizarQuestoes';

import AddQuestao from './componentes/AddQuestao';
import api, { alertas, apiUtils } from '../../api/axiosConfig'

import estilos from '../../Estilos/simulados.module.css';

import BtnLixo from '../../Imagens/BtnLixo.png';
import BtnVisu from '../../Imagens/eye.png'

export default function CriacaoSimulados() {
    const navigate = useNavigate();
    const [listaQuestoes, setListaQuestoes] = useState([]);
    const [showModalNovaQuestao, setShowModalNovaQuestao] = useState(false);
    const [showModalAddQuestao, setShowModalAddQuestao] = useState(false);
    const [showModalVisualizarQuestao, setShowModalVisualizarQuestao] = useState(false);
    const [questaoSelecionada, setQuestaoSelecionada] = useState(null);


    // Definindo o estado para armazenar a opção selecionada no Select
    const [selecionarOpcao, setSelecionarOpcao] = useState(null);


    useEffect(() => {
        api.get('/api/adm/disciplinas/porProfessor')
    }, []);

    // Definição das opções para o Select
    const opcoes = [
        { value: '1', label: 'Biologia' },
        { value: '2', label: 'Filosofia' },
        { value: '3', label: 'Física' },
        { value: '4', label: 'Geografia' },
        { value: '5', label: 'História' },
        { value: '6', label: 'Inglês' },
        { value: '7', label: 'Língua Portuguesa' },
        { value: '8', label: 'Matemática' },
        { value: '9', label: 'Química' },
        { value: '10', label: 'Sociologia' }
    ];

    // Função chamada quando uma opção é selecionada no Select
    const carregarEscolhas = (opcaoSelecionada) => {
        setSelecionarOpcao(opcaoSelecionada); // Atualiza o estado com a opção selecionada
    };

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
            });

            if (apiUtils.ok(resp)) {
                // Sucesso
            } else {
                alertas.erro("Ops!");
            }

        } catch (error) {
            console.error(error);
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
        obj.id = null;
        obj.disciplina_id = 1; // atribuir disciplina escolhi no inicio da criação do simulado

        setListaQuestoes([...listaQuestoes, obj]);
        setShowModalNovaQuestao(false); // esconde o modal
    }

    function removerQuestao(id) {
        setListaQuestoes(listaQuestoes.filter(questao => questao.id !== id));
    }

    function escodenModais() {
        setShowModalNovaQuestao(false);
        setShowModalAddQuestao(false);
    }

    // ======================================================================
    // ======================================================================
    // ======================================================================
    return (
        <>
            {/* Cabeçalho da pagina */}
            <div className={`${estilos.header} d-flex align-items-center justify-content-center`}>
                <button className={estilos.btnNave} onClick={() => navigate('/simuladosCriados')}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" />
                </button>
                <h1>Criar Simulados</h1>
            </div>


            {/* Botões Modais */}
            <div className={`${estilos.container}`}>
                {/* Listagem das questoes adicionadas no simulado */}
                <h2>Adicionando Elementos ao Simulado</h2>
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
                        // questao={questaoParaEditar} // Passa a questão para edição
                        acaoAddNovaQuestao={addicionarQuestaoNovaAoSimuladoAtual}
                        acaoCancelar={() => {
                            escodenModais();
                            // setQuestaoParaEditar(null); // Reseta o estado ao cancelar
                        }}
                    />
                </MinhaModal>

                {/* Modal para escolher e adicionar uma questão existente ao simulado */}
                <MinhaModal visivel={showModalAddQuestao} >
                    <AddQuestao
                        acaoCancelar={() => escodenModais()}
                        acaoAddQuestao={addicionarQuestaoDoBancoAoSimuladoAtual} />
                </MinhaModal>

                <MinhaModal visivel={showModalVisualizarQuestao}>
                    {questaoSelecionada && (
                        <VisualizarQuestoes
                            questao={questaoSelecionada}
                            acaoCancelar={() => setShowModalVisualizarQuestao(false)}
                        />
                    )}
                </MinhaModal>



                <div className={`${estilos.divInputs}`}>

                    {/* Descrição do Simulados */}
                    {!showModalNovaQuestao && !showModalAddQuestao && !showModalVisualizarQuestao && (
                        <div className={`mt-3 mb-3`}>
                            <textarea
                                type="text"
                                className={`${estilos.textarea} form-control`}
                                id="descricao"
                                aria-describedby="descricao"
                                placeholder="Descrição do Simulado"
                            // value={}
                            // onChange={}
                            />
                        </div>
                    )}

                    {!showModalNovaQuestao && !showModalAddQuestao && !showModalVisualizarQuestao && (
                        <Select
                            value={selecionarOpcao}
                            onChange={carregarEscolhas}
                            options={opcoes}
                            placeholder="Selecione a Disciplina"
                        />
                    )}
                </div>

                <div className={`${estilos.divider} mt-3 mb-3`} />

                <h4>Questões selecionadas: {listaQuestoes.length}</h4>

                <div className={estilos.simuladoscontainer}>
                    {listaQuestoes.map((questao, index) => (
                        <div key={index}>
                            <h5 className={estilos.materiatitulo}>{questao.disciplina}</h5>
                            <div className={`${estilos.simuladocard} d-flex align-items-center justify-content-between`}>
                                <div className={`${estilos.descricao} d-flex flex-column`}>
                                    <p className={estilos.descricaosimulado}>Enunciado da Questão: {questao.enunciado}</p>
                                </div>

                                <div className={estilos.divisor}></div>
                                <div className={`${estilos.botoesswitch} d-flex flex-column align-items-center`}>
                                    <button
                                        className={`${estilos.btnFuncao} btn`}
                                        onClick={() => {
                                            setQuestaoSelecionada(questao); // Define a questão para visualizar
                                            setShowModalVisualizarQuestao(true); // Mostra a modal
                                        }}>
                                        <img className={`${estilos.ImgBtn}`} src={BtnVisu} alt="Visualizar Questão" />
                                    </button>

                                    <button className={`${estilos.btnFuncao} btn`} onClick={() => removerQuestao(questao.id)}>
                                        <img className={`${estilos.ImgBtn}`} src={BtnLixo} alt="Remover Questão" />
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