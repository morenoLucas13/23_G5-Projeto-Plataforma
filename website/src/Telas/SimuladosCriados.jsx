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
            const response = await api.get('/api/adm/simulados/simuladosCriados')
            // console.log('Dados da response:', response.data)
            setSimulados(response.data.simulados)
        } catch (error) {
            console.log('Ops! Erro ao buscar simulados criados:', error)
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'Ocorreu um erro ao buscar simulados criados. Tente novamente mais tarde.'
                
            })
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
                        {/* Verifica se há simulados para exibir */}
                        {simulados.length > 0 ? (
                            simulados.map((simulado) => (
                                <div key={simulado.id} className={estilos.simuladocard}>
                                    {/* Alinhamento à esquerda dos títulos das matérias */}
                                    <h5 className={estilos.materiatitulo}>{simulado.nomeDisciplina}</h5>
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/* Texto e Descrição do Simulado */}
                                        <div className={`${estilos.descricao} d-flex flex-column`}>
                                            <p className={estilos.descricaosimulado}>
                                                {simulado.descricao}
                                            </p>
                                            <p className={estilos.datacriacao}>
                                                Criado em: {new Date(simulado.data_criacao).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* Divisor Vertical */}
                                        <div className={estilos.divisor}></div>

                                        {/* Botões e Switch */}
                                        <div className={`${estilos.botoesswitch} d-flex flex-column align-items-center`}>
                                            {/* Componente de Switch */}
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`switch${index}`}
                                                    className={estilos.switchcheckbox}
                                                />
                                                <label htmlFor={`switch${index}`} className={estilos.switchlabel}></label>
                                            </div>

                                            {/* Botão de Editar */}
                                            <button className="btn me-3 mt-2">
                                                <img src={IconeLapis} alt="Ícone de Lápis" />
                                            </button>

                                            {/* Número de Questões */}
                                            <span className={`${estilos.numeroquestoes} mt-2`}>16</span>
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