import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import CardCabecalho from '../Componentes/CardCabecalho';

export default function Questoes({ route }) {
  const { idSimulado } = route.params;
  console.log('ID do Simulado recebido:', idSimulado);

  /** array com as questoes a serem exibidas para o usuário */
  const [questoes, setQuestoes] = useState([]);

  /** array com as resposta escolhidas pelo usuário */
  const [questoesResposta, setQuestoesResposta] = useState([]);

  // const [respostaCerta, setRespostaCerta] = useState({});
  const [questaoRespondida, setQuestaoRespondida] = useState([]);

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        console.log('URL chamada:', `/api/alunos/simulados/${idSimulado}/questoes`); // Debug

        const response = await api.get(`/api/alunos/simulados/${idSimulado}/questoes`);
        if (response.data.sucesso) {
          let questoesApi = response.data.questoesSimulado;

          setQuestoes(questoesApi);
          setQuestoesResposta(questoesApi.map((x) => null))

          console.log("Questoes recebidas API\n", JSON.stringify(response.data.questoesSimulado, null, 2));
        } else {
        }
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
      }
    };

    carregarQuestoes();
  }, [idSimulado]);

  const verificarResposta = (questao_idx_array, alternativaEscolhida, alternativaCorreta) => {

    // if (!questaoRespondida[idQuestao]) {

    // registrando a resposta do usuario no vetor
    questoesResposta[questao_idx_array] = alternativaEscolhida;

    // atualizando useState para o react reconhecer que aconteceu uma atualização
    setQuestoesResposta([...questoesResposta])



    // setRespostaSelecionada(
    //   [
    //     ...respostaSelecionada,
    //   ]);
    // // setRespostaCerta({ ...respostaCerta, [idQuestao]: alternativaCorreta });
    // setQuestaoRespondida({ ...questaoRespondida, [idQuestao]: true });
    // }
  };

  const enviarRespostas = async () => {
    if (questoesResposta.includes(null) == false) {
      try {
        let respostas = questoes.map(
          (q, qIdxAarray) => (
            {
              id: q.id,
              resposta: questoesResposta[qIdxAarray]
            }
          ))

        const response = await api.post(`/api/alunos/relatorios/pontuacao/${idSimulado}`, { respostas });

        if (response.data.sucesso) {
          Alert.alert('Resultado', `Pontuação: ${response.data.pontuacao.pontos}`);
        } else {
          Alert.alert('Erro', response.data.mensagem);
        }
      } catch (error) {
        console.error('Erro ao enviar respostas:', error);
        Alert.alert('Erro', 'Falha ao enviar respostas. Tente novamente.');
      }
    } else {
      Alert.alert("Atenção", "Existem questões sem resposta. Por favor verifique antes de enviar");
    }
  };


  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <CardCabecalho texto="QUESTÕES" navegacao="tela_entrada" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questoes.map((questao, questao_idx) => (
          <View key={questao.id} style={styles.cardQuestao}>
            <Text style={styles.txtQuestao}>{questao.textoQuestao}</Text>
            <Text style={styles.txtQuestao}>{questao.enunciado}</Text>
            <View>
              {['A', 'B', 'C', 'D', 'E'].map((letra) => {
                const alternativa = questao[`alternativa${letra}`];
                const correta = questao.alternativaCorreta;
                const selecionada = questoesResposta[questao_idx];

                // troca cor do botao se tem resposta
                let corBotao = '#FFFFFF';
                if (questoesResposta[questao_idx] !== null) { // tem resposta

                  if (letra === correta) corBotao = '#32CD32';
                  else if (letra == selecionada) corBotao = '#FF6347';
                }

                return (
                  <TouchableOpacity
                    key={letra}
                    style={[styles.botao, { backgroundColor: corBotao }]}
                    onPress={() => verificarResposta(questao_idx, letra, correta)}
                    disabled={questoesResposta[questao_idx] !== null} // Desabilita o botão após a primeira seleção
                  >
                    <Text>{letra}. {alternativa}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.botaoEnviar} onPress={enviarRespostas}>
        <Text style={styles.txtBotaoEnviar}>Enviar Respostas</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20, // Espaço extra para rolagem confortável
    paddingTop: 10, // Espaço acima para visualização inicial
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  cardQuestao: {
    margin: 10,
    padding: 10,
    backgroundColor: '#B6B9EF',
    borderRadius: 10
  },
  txtQuestao: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  botao: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1
  },
  botaoEnviar: {
    margin: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  txtBotaoEnviar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
