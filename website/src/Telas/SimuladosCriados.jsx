import React, { useEffect, useState } from 'react';
import BotaoRetornar from '../Imagens/botaoRetornar.png';
import IconeLapis from '../Imagens/IconeLapis.png';
import api from '../../src/api/axiosConfig'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import estilos from '../Estilos/simulados.module.css';

export default function SimuladosCriados() {
    const [simulados, setSimulados] = useState([]);

    const buscarSimuladosCriados = async () => {
        try {
            const response = await api.get('/api/adm/simulados/simuladosCriados');
            // Alteração aqui: mudar de response.data.simulados para response.data.resposta
            if (Array.isArray(response.data.resposta)) {
                setSimulados(response.data.resposta);
            } else {
                setSimulados([]);  // Caso a resposta não seja um array
            }
        } catch (error) {
            console.log('Ops! Erro ao buscar simulados criados:', error);
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'Ocorreu um erro ao buscar simulados criados. Tente novamente mais tarde.'
            });
        }
    }

    useEffect(() => {
        (async () => {
            buscarSimuladosCriados();
        })();
    }, [])

    const navigate = useNavigate();

    return (
        <>
            {/* Cabeçalho da página */}
            <div className={`${estilos.header} d-flex align-items-center justify-content-center`}>
                <button className={estilos.btnNave}>
                    <img src={BotaoRetornar} alt="Botão de Retorno" onClick={() => navigate('/home')} />
                </button>
                <h1>Simulados Criados</h1>
            </div>

            {/* Container Principal */}
            <div className={`${estilos.container} mt-4`}>
                <button className={`btn mb-4 ${estilos.btnpersonalizado}`} onClick={() => navigate('/criacao')}>Criar Novo Simulado</button>

                <div className={estilos.simuladoscontainer}>


                    {/* Loop para renderizar cada simulado */}
                    <div className={estilos.simuladoscontainer}>
                        {(simulados && simulados.length > 0) ? (
                            simulados.map((simulado, index) => (
                                <div key={simulado.id}>
                                    <div className={estilos.linha}>
                                        <h5 className={estilos.materiatitulo}>{simulado.nomeDisciplina}</h5>
                                        <h5 className={estilos.materiatitulo}>
                                            Criado em: {new Date(simulado.data_criacao).toLocaleDateString()}
                                        </h5>
                                    </div>
                                    <div className={estilos.simuladocard}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className={`${estilos.descricao} d-flex flex-column`}>
                                                <p className={estilos.descricaosimulado}>{simulado.descricao}</p>
                                            </div>
                                            <div className={estilos.divisor}></div>
                                            <div className={`${estilos.botoesswitch} d-flex flex-column align-items-center`}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id={`switch${index}`}
                                                        className={estilos.switchcheckbox}
                                                    />
                                                    <label htmlFor={`switch${index}`} className={estilos.switchlabel}></label>
                                                </div>
                                                <button className="btn me-3 mt-2">
                                                    <img src={IconeLapis} alt="Ícone de Lápis" />
                                                </button>
                                                <span className={`${estilos.numeroquestoes} mt-2`}>{simulado.totalQuestoes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum simulado encontrado!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
