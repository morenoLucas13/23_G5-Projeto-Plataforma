import React from 'react'
import estilos from '../Telas/Login/Login.module.css'

export default function InputLogECad({ placeholder, icon, titulo }) {
    return (
        <div className={estilos.inputWrapper}>
            <h6 className={estilos.titulo}>{titulo}</h6>
            <div className={estilos.inputContainer}>
                <img src={icon} className={estilos.emoji} alt="Ícone do input" />
                <input
                    type="text"
                    className={estilos.inputTexto}
                    placeholder={placeholder}
                // value={senha}
                // onChange={(evt) => { setSenha(evt.target.value) }} 
                />
            </div>
            <div className={estilos.divider}></div>
        </div>
    )
}