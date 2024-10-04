import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BtnNave({ titulo, rota, icone }) {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(rota)} className="button">
            <div>
                <img src={icone} alt={`${titulo} Ícone`} />
            </div>
            {titulo}
        </button>
    );
}
