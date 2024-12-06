import React from 'react'
import estilos from '../Telas/Login/Login.module.css'

export default function InputLogECad({ nome, tipo, placeholder, icon, titulo, valor, onChange, secureTextEntry }) {
    return (
        <div className={estilos.inputWrapper}>
            <h6 className={estilos.titulo}>{titulo}</h6>
            <div className={estilos.inputContainer}>
                <img src={icon} className={estilos.emoji} alt="Ícone do input" />
                <input
                    name={nome}
                    type={tipo}
                    className={estilos.inputTexto}
                    placeholder={placeholder}
                    value={valor}
                    onChange={(evt) => { onChange(evt.target.value) }}
                />
            </div>
            <div className={estilos.divider}></div>
        </div>
    )
}