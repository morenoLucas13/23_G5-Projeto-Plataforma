import React, { useState } from 'react'

export default function NovaQuestao({ acaoAddNovaQuestao, acaoCancelar }) {
    const [texto, setTexto] = useState('');
    const [enunciado, setEnunciado] = useState('');

    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');

    function retornarQuestao() {
        acaoAddNovaQuestao({
            enunciado,
            texto,
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE
        })
    }




    return (
        <div className='col-8 mx-auto border border-1'>
            {/*  */}
            <h2 className='text-center'>Adicione sua propria questão</h2>
            <div class="form-floating">
                <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    value={texto}
                    onChange={(e) => { setTexto(e.target.value) }} />
                <label for="floatingTextarea">Texto da questão</label>
            </div>
            {/*  */}
            <div class="form-floating">
                <textarea class="form-control" placeholder="" id="floatingTextarea"
                value={enunciado}
                onChange={(e) => { setEnunciado(e.target.value) }} />
                <label>Enunciado</label>
            </div>
            <div>
                {['A', 'B', 'C', 'D', 'E'].map(x => (
                    <>
                        <div className='row align-items-center'>
                            <div className='col-auto'>
                                {x}
                            </div>
                            <div className='col'>
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="" id="floatingTextarea"></textarea>
                                    <label>Alternativa A</label>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <button className='btn btn-primary'
                onClick={retornarQuestao}>Adicionar ...</button>
            <button className='btn btn-danger'
                onClick={acaoCancelar}>Cancelar ...</button>

        </div>
    )
}
