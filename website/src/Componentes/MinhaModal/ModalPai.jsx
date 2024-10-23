import React, { useState } from 'react'


import './pai.css';

import MinhaModal from './MinhaModal'

export default function ModalPai() {
    const [mostrar, setMostrar] = useState(false);

    const acaoMostrar = () => {
        setMostrar(true);
    };

    const acaoFechar = () => {
        setMostrar(false);
    };

    return (
        <div>
            <button onClick={acaoMostrar}>Abrir Modal</button>
            <MinhaModal visivel={mostrar}>
                <h2>Conteúdo da Modal</h2>
                <p>Este é o conteúdo que pode rolar dentro da modal.</p>
                <button onClick={acaoFechar}>Fechar Modal</button>
            </MinhaModal>

            <div className="page-content">
                <p>Este é o conteúdo da página por trás da modal.</p>
                <p>Role a página para ver mais conteúdo aqui.</p>
            </div>

        </div>
    )
}
