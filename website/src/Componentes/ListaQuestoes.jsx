import React from 'react';
import BtnAdicionar from '../Imagens/BtnAdicionar.png'

export default function ListaQuestoes({ questoes, adicionarQuestao }) {
  return (
    <div className="questoes-list">
      <h2>Questões cadastradas:</h2>
      {questoes.map(questao => (
        <div>
          <h4>{questao.disciplina}</h4>
          <div key={questao.id} className="simulado-card">
            <p>{questao.enunciado}</p>
            <button onClick={() => adicionarQuestao(questao)}>
              <img src={BtnAdicionar} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}