import React from 'react'

export default function InputLogECad({ placeholder, icon, titulo }) {
    return (
        <div className="inputWrapper">
            <h6 className="titulo">{titulo}</h6>
            <div className="inputContainer">
                <img src={icon} className="emoji" alt="Ícone do input" />
                <input
                    type="text"
                    className="inputTexto"
                    placeholder={placeholder}
                // value={senha}
                // onChange={(evt) => { setSenha(evt.target.value) }} 
                />
            </div>
            <div className="divider"></div>
        </div>
    )
}