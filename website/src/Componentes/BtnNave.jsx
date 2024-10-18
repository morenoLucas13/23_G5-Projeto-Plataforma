import React from 'react';
import { useNavigate } from 'react-router-dom';

import estilos from '../Estilos/home.module.css'

export default function BtnNave({ titulo, rota, icone }) {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(rota)} className={estilos.button}>
            <div>
                <img src={icone} alt={`${titulo} Ícone`} />
            </div>
            {titulo}
        </button>
    );
}
