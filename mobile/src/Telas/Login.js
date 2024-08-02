import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

// COMPONENTES
import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad'

export default function App() {

  [fontesCarregadas] = useFonts({ Poppins_700Bold })
  if (!fontesCarregadas) return null

  return (
    <View style={styles.base}>
      <Image
        source={require('../Imagens/FerramentasConhecimento.png')}
        style={styles.background}
      />

      <View style={styles.container}>

        {/* Imagem */}
        <Image style={styles.imagem} source={require('../Imagens/LogoDoApp.png')} />

        {/* Campos do TextInput */}
        <View style={{ width: '80%', marginBottom: 100 }}>
          <CaixaDeTextoLogCad
            texto="Nome do usuário:"
            placeholder="Insira o seu nome"
            emoji={require('../Imagens/IconePessoa.png')}
          />

          <CaixaDeTextoLogCad
            texto="Senha do usuário:"
            placeholder="Insira a sua senha"
            emoji={require('../Imagens/IconeCadeado.png')}
          />

          {/* Botão onde direcionará o usuário a página de CADASTRO! */}
          <TouchableOpacity>
            <Text style={styles.textoBotao}>Você ainda não se CADASTROU?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.botao}>
            <Text style={{ fontFamily: 'Poppins_700Bold', color: 'white', fontSize: 25 }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#F2F6FA'
  },
  container: {
    alignItems: 'center'
  },
  imagem: {
    width: 220,
    height: 170,
    top: 15,
    marginBottom: 50
  },
  textoBotao: {
    color: '#132B47',
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_700Bold'
  },
  botao: {
    backgroundColor: '#132B47',
    width: 271,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    top: 160,
    width: 395,
    height: 631,
    position: 'absolute'
  }
});