import React, { useState } from 'react';

export default function CriarQuestao({ setCriarNovaQuestao, setQuestoes }) {
  const [novaQuestao, setNovaQuestao] = useState({
    disciplina: '',
    enunciado: '',
    alternativas: [],
    correta: null,
  });

  const [novaAlternativa, setNovaAlternativa] = useState('');

  // Adicionar nova alternativa à lista
  const adicionarAlternativa = () => {
    if (novaAlternativa.trim()) {
      setNovaQuestao({
        ...novaQuestao,
        alternativas: [...novaQuestao.alternativas, novaAlternativa],
      });
      setNovaAlternativa(''); // Limpar o campo de texto
    }
  };

  // Definir qual alternativa é correta
  const definirCorreta = (index) => {
    setNovaQuestao({ ...novaQuestao, correta: index });
  };

  // Salvar a nova questão
  const salvarQuestao = () => {
    if (novaQuestao.enunciado && novaQuestao.disciplina && novaQuestao.alternativas.length > 0) {
      setQuestoes(prevQuestoes => [
        ...prevQuestoes,
        { ...novaQuestao, id: prevQuestoes.length + 1 }, // Adicionar um ID único
      ]);
      setCriarNovaQuestao(false); // Retornar à tela principal
    } else {
      alert('Preencha todos os campos para salvar a questão.');
    }
  };

  return (
    <div className="criar-questao">
      <h2>Adicionar Nova Questão</h2>
      <div className="form-group">
        <label>Disciplina</label>
        <input
          type="text"
          value={novaQuestao.disciplina}
          onChange={(e) => setNovaQuestao({ ...novaQuestao, disciplina: e.target.value })}
          placeholder="Ex: Biologia"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Enunciado</label>
        <textarea
          value={novaQuestao.enunciado}
          onChange={(e) => setNovaQuestao({ ...novaQuestao, enunciado: e.target.value })}
          placeholder="Digite o enunciado da questão..."
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Alternativas</label>
        <div className="alternativas">
          {novaQuestao.alternativas.map((alternativa, index) => (
            <div key={index} className="alternativa-item">
              <input
                type="radio"
                name="alternativaCorreta"
                checked={novaQuestao.correta === index}
                onChange={() => definirCorreta(index)}
              />
              <span>{alternativa}</span>
            </div>
          ))}
          <input
            type="text"
            value={novaAlternativa}
            onChange={(e) => setNovaAlternativa(e.target.value)}
            placeholder="Digite uma alternativa..."
            className="form-control"
          />
          <button onClick={adicionarAlternativa} className="btn btn-add">Adicionar Alternativa</button>
        </div>
      </div>
      <button onClick={salvarQuestao} className="btn btn-success">Salvar Questão</button>
    </div>
  );
}
