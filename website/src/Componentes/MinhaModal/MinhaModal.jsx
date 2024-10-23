import React, { useEffect, useState } from 'react';
import estilos from './MinhaModal.module.css';

export default function MinhaModal({ visivel, acaoFechar, children }) {
    
    useEffect(() => {
        if (visivel) {
            document.body.classList.add(estilos.bloqueia_scroll)
        }
        else{
            document.body.classList.remove(estilos.bloqueia_scroll)
        }
    }, [visivel])

    return (
        <>
            {visivel && (
                <div className={estilos.fundo_tranparente} >
                    <div className={estilos.conteudo_modal}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}