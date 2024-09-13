import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, } from 'react-native';

// COMPONENTES
import BotoesDeNavegacao from '../Componentes/BotoesDeNavegacao';
import CarouselDeImagens from '../Componentes/CarouselDeImagens';

const images = [
  require('../Imagens/imagem1.jpg'),
  require('../Imagens/imagem2.jpg'),
  require('../Imagens/imagem3.jpg'),
];

export default function Home() {
  return (
    <View style={styles.container}>

      {/* View dos Elementos do Cabeçalho */}
      <View style={styles.cardCabecalho}>
        <Text style={styles.textCabecalho}>Seja bem-vindo,</Text>
        <Text style={styles.textNome}>Lucas Neponuceno Moreno</Text>

        <View style={styles.cardPontuacao}>
          <TouchableOpacity style={styles.btnPontuacao}>
            <Image
              style={{ height: 45, width: 45 }}
              source={require('../Imagens/IconePontuacao.png')}
            />
            <Text style={styles.textPontuacao}>66666</Text>
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
          icone={require('../Imagens/IconeChat.png')}
          texto={'Bate-papo'}
          navegacao={'tela_chat'}

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
