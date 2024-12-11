import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/axiosConfig'

// COMPONENTES
import BotoesDeNavegacao from '../Componentes/BotoesDeNavegacao';
import CarouselDeImagens from '../Componentes/CarouselDeImagens';

const images = [
  require('../Imagens/vestibulares/ENEM.png'),
  require('../Imagens/vestibulares/fuvestVESTIBULAR.png'),
  require('../Imagens/vestibulares/UELVest.png'),
  require('../Imagens/vestibulares/UEMVest.png'),
  require('../Imagens/vestibulares/UNESPvesti.png'),
  require('../Imagens/vestibulares/UNICAMPvest.png'),
  require('../Imagens/vestibulares/UNIFESP.png'),
  require('../Imagens/vestibulares/vestibularToledo.png'),
  require('../Imagens/vestibulares/vestibularUNOESTE.png'),
];

export default function Home() {
  const navigation = useNavigation();

      // Estado para armazenar o nome do professor
      const [nomeAluno, setNomeAluno] = useState('');
      const [pontuacao, setPontuacao] = useState('');

      // Função para buscar o nome do professor
      async function buscarNomeToken() {
          try {
              const resposta = await api.get('/api/login/dadosUser');
  
              // Acessa o primeiro item da matriz retornada e extrai o nome
              if (resposta.data && resposta.data.length > 0) {
                  setNomeAluno(resposta.data[0].nome);
                  setPontuacao(resposta.data[0].pontuacao);
              } else {
                  console.log('Nenhum dado de usuário retornado.');
              }
          } catch (error) {
              console.log('Ocorreu um erro ao buscar o nome do usuário a partir do token.', error);
          }
      }
  
  
      // Chamando a função buscarNomeToken assim que o componente for montado
      useEffect(() => {
          buscarNomeToken();
      }, []);


  return (
    <View style={styles.container}>

      {/* View dos Elementos do Cabeçalho */}
      <View style={styles.cardCabecalho}>
        <Text style={styles.textCabecalho}>Seja bem-vindo,</Text>
        <Text style={styles.textNome}>{nomeAluno}</Text>

        <View style={styles.cardPontuacao}>
          <TouchableOpacity style={styles.btnPontuacao}
            onPress={() => navigation.navigate('tela_ranking')}>
            <Image
              style={{ height: 45, width: 45 }}
              source={require('../Imagens/IconePontuacao.png')}
            />
            <Text style={styles.textPontuacao}>{pontuacao}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textoContainer}>
        <Text style={styles.texto}>
          Tá curtindo seu dia?
        </Text>

        <Text style={styles.texto}>
          Até as princesas precisam estudar 📚🥺
        </Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.botoesContainer}>
        <BotoesDeNavegacao
          icone={require('../Imagens/IconeSimulado.png')}
          texto={'Simulado'}
          navegacao={'tela_simulados'}
        />

        <BotoesDeNavegacao
          icone={require('../Imagens/IconeRelatorio.png')}
          texto={'Raio-X'}
          navegacao={'tela_relatorio'}
        />

        <BotoesDeNavegacao
          icone={require('../Imagens/IconeControle.png')}
          texto={'Jogos'}
          navegacao={'tela_jogos'}
        />

      </View>

      <View style={styles.divisor} />

      <View style={styles.carouselContainer}>
        <CarouselDeImagens images={images} />
      </View>

      <View style={styles.cardFechamentoTela} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FA',
    paddingBottom: 100,
    alignItems: 'center'
  },
  cardCabecalho: {
    width: '100%',
    height: 180,
    backgroundColor: '#132B47',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textCabecalho: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5
  },
  textNome: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10
  },
  cardPontuacao: {
    marginTop: 10
  },
  btnPontuacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6D72B8',
    height: 52,
    width: 154,
    borderRadius: 60,
    paddingHorizontal: 10
  },
  textPontuacao: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  textoContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  texto: {
    fontSize: 22,
    textAlign: 'center',
  },
  divisor: {
    height: 1,
    width: '95%',
    backgroundColor: '#BCBCC1',
    marginVertical: 10,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  carouselContainer: {

  },
  cardFechamentoTela: {
    width: '100%',
    height: 60,
    backgroundColor: '#132B47',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0
  }
});
