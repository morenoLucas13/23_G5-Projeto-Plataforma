import React from 'react';

export default function QuestoesAdicionadas({ questoesAdicionadas, removerQuestao }) {
  return (
    <div className="questoes-adicionadas">
      <h2>Questões já adicionadas no Simulado</h2>
      {questoesAdicionadas.length > 0 ? (
        questoesAdicionadas.map(questao => (
          <div key={questao.id} className="questao-adicionada">
            <h4>{questao.disciplina}</h4>
            <p>{questao.enunciado}</p>
            <button className="btn-remove" onClick={() => removerQuestao(questao.id)}>Remover</button>
          </div>
        ))
      ) : (
        <p>Não há questões adicionadas ao simulado.</p>
      )}
    </div>
  );
}
