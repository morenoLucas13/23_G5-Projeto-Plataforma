import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// COMPONENTES
import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad'


export default function Login() {
  
  const navigation = useNavigation()
  
  function navegar() {
    navigation.navigate('tela_cadastro')
  }

  // ==================================================================

  const [email, setEmail] = useState('lucas.moreno@portalsesisp.org.br');
  const [senha, setSenha] = useState('Sesisp@2643');

  async function requisitaAutenticacao() {
    // Alert.alert(`O email é ${email} e a senha é ${senha}`)

    try {
      let resp = await axios(
        {
          method: 'post',
          url: 'http://10.188.11.164:3313/login',
          data: { email: email, senha: senha },
          timeout: 3000
        }
      );

      // somente para visualizar os conteúdos das variáveis de resposta  
      console.log("== Status Code ==")
      console.log(resp.status)
      console.log("== Dados ==")
      console.log(resp.data)

      if (resp.status == 200) {
        if (resp.data.sucesso == true) {
          console.log("+++ SUCESSO +++")

          navigation.navigate('tela_entrada')
        } else {
          console.log('+++ Login inválido +++')
          console.log(resp.data.erro)
        }
      } else {
        console.log('Ops. Não foi possivel se concluir a operação.')
        console.log(resp.data.erro)
      }
    } catch (error) {
      console.log(error)
      console.log('Ops. Não foi possivel se comunicar com o servidor.')
    }
  }

  // ==================================================================

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
            texto="Email do usuário:"
            placeholder="Insira o seu email"
            emoji={require('../Imagens/IconePessoa.png')}
            onChangeText={setEmail}
            value={email}
          />

          <CaixaDeTextoLogCad
            texto="Senha do usuário:"
            placeholder="Insira a sua senha"
            emoji={require('../Imagens/IconeCadeado.png')}
            onChangeText={setSenha}
            value={senha}
          />

          {/* Botão onde direcionará o usuário a página de CADASTRO! */}
          <TouchableOpacity
          onPress={navegar}>
            <Text style={styles.textoBotao}>Você ainda não se CADASTROU?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.botao}
          onPress={requisitaAutenticacao}
          >
            <Text style={{ color: 'white', fontSize: 25 }}>
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
    top: 180,
    width: 395,
    height: 631,
    position: 'absolute'
  }
});