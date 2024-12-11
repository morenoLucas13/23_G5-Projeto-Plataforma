import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import CardCabecalho from '../Componentes/CardCabecalho';

export default function Questoes({ route }) {
  const { idSimulado } = route.params;
  console.log('ID do Simulado recebido:', idSimulado);

  const [questoes, setQuestoes] = useState([]);
  const [respostaSelecionada, setRespostaSelecionada] = useState({});
  const [respostaCerta, setRespostaCerta] = useState({});
  const [questaoRespondida, setQuestaoRespondida] = useState({});

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        console.log('URL chamada:', `/api/alunos/simulados/${idSimulado}/questoes`); // Debug

        const response = await api.get(`/api/alunos/simulados/${idSimulado}/questoes`);
        if (response.data.sucesso) {
          setQuestoes(response.data.questoesSimulado);
        } else {
        }
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
      }
    };

    carregarQuestoes();
  }, [idSimulado]);

  const verificarResposta = (idQuestao, alternativaEscolhida, alternativaCorreta) => {
    if (!questaoRespondida[idQuestao]) {
      setRespostaSelecionada({ ...respostaSelecionada, [idQuestao]: alternativaEscolhida });
      setRespostaCerta({ ...respostaCerta, [idQuestao]: alternativaCorreta });
      setQuestaoRespondida({ ...questaoRespondida, [idQuestao]: true });
    }
  };

  const enviarRespostas = async () => {
    try {
      const respostas = respostaSelecionada // Coleta todas as respostas do estado
      console.log('Respostas enviadas:', respostas)

      const response = await api.post(`/api/alunos/simulados/${idSimulado}/pontuacao`, { respostas });

      if (response.data.sucesso) {
        Alert.alert('Resultado', `Pontuação: ${response.data.pontos}`);
      } else {
        Alert.alert('Erro', response.data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
      Alert.alert('Erro', 'Falha ao enviar respostas. Tente novamente.');
    }
  };


  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <CardCabecalho texto="QUESTÕES" navegacao="tela_entrada" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questoes.map((questao) => (
          <View key={questao.id} style={styles.cardQuestao}>
            <Text style={styles.txtQuestao}>{questao.textoQuestao}</Text>
            <Text style={styles.txtQuestao}>{questao.enunciado}</Text>
            <View>
              {['A', 'B', 'C', 'D', 'E'].map((letra) => {
                const alternativa = questao[`alternativa${letra}`];
                const correta = questao.alternativaCorreta;
                const selecionada = respostaSelecionada[questao.id] === letra;

                let corBotao = '#FFFFFF';
                if (respostaSelecionada[questao.id]) {
                  if (letra === correta) corBotao = '#32CD32';
                  else if (selecionada) corBotao = '#FF6347';
                }

                return (
                  <TouchableOpacity
                    key={letra}
                    style={[styles.botao, { backgroundColor: corBotao }]}
                    onPress={() => verificarResposta(questao.id, letra, correta)}
                    disabled={questaoRespondida[questao.id]} // Desabilita o botão após a primeira seleção
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
