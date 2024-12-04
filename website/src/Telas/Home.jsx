import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Enem from '../Imagens/vestibulares/ENEM.png';
import Fuvest from '../Imagens/vestibulares/fuvestVESTIBULAR.png';
import Uel from '../Imagens/vestibulares/UELVest.png';
import Uem from '../Imagens/vestibulares/UEMVest.png';
import Unesp from '../Imagens/vestibulares/UNESPvesti.png';
import Unicamp from '../Imagens/vestibulares/UNICAMPvest.png';
import Unifesp from '../Imagens/vestibulares/UNIFESP.png';
import Toledo from '../Imagens/vestibulares/vestibularToledo.png';
import Unoeste from '../Imagens/vestibulares/vestibularUNOESTE.png';
import IcoSimu from '../Imagens/IconeSimulado.png';
import IcoRelatorio from '../Imagens/IconeRelatorio.png';

import BtnNave from '../Componentes/BtnNave';

import estilos from '../Estilos/home.module.css';



export default function Home() {
    // Estado para armazenar o nome do professor
    const [nomeProfessor, setNomeProfessor] = useState('');

    // Função para buscar o nome do professor
    async function buscarNomeToken() {
        try {
            const resposta = await api.get('/api/login/dadosUser');
            // Supondo que a resposta tenha um campo 'nome' que contém o nome do professor
            setNomeProfessor(resposta.data.nome);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar o nome do usuário a partir do token.');
        }
    }

    // Chama a função buscarNomeToken assim que o componente for montado
    useEffect(() => {
        buscarNomeToken();
    }, []);

    const vestibulares = [
        { src: Enem, alt: 'ENEM 2024' },
        { src: Fuvest, alt: 'Fuvest Vestibular' },
        { src: Uel, alt: 'UEL Vestibular' },
        { src: Uem, alt: 'UEM Vestibular' },
        { src: Unesp, alt: 'UNESP Vestibular' },
        { src: Unicamp, alt: 'Unicamp Vestibular' },
        { src: Unifesp, alt: 'Unifesp Vestibular' },
        { src: Toledo, alt: 'Toledo Vestibular' },
        { src: Unoeste, alt: 'UNOESTE Vestibular' }
    ];

    return (
        <div className={estilos.divMain}>
            <div className={estilos.header1}>
                <div className={estilos.welcomemessage}>Seja bem-vindo,</div>
                <h1>{nomeProfessor}</h1>
            </div>

            <div className={estilos.mainContent}>
                <div className="text-center my-4">
                    <h3>Tá curtindo seu dia?</h3>
                    <h3>Até as princesas precisam estudar 📚🥺</h3>
                </div>

                <div className={estilos.divider}></div>

                <div className={estilos.buttoncontainer}>
                    <BtnNave titulo="Simulados" rota="/simuladosCriados" icone={IcoSimu} />
                    <BtnNave titulo="Raio-X" rota="/" icone={IcoRelatorio} />
                </div>

                <div className={estilos.divider}></div>

                <div id="carouselExampleIndicators" className={`carousel slide ${estilos.carouselcontainer}`} data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {vestibulares.map((vestibular, index) => (
                            <div
                                className={`carousel-item ${index === 0 ? 'active' : ''} ${estilos.carouselitem}`}
                            >
                                <img src={vestibular.src} alt={vestibular.alt} className="d-block w-100" />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <div className={estilos.header2} />
        </div>

    );
}