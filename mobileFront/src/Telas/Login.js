import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad';
import axios from 'axios';

axios.defaults.baseURL = "http://10.132.224.72:3901";
axios.defaults.timeout = 3000;

export default function Login() {
  const navigation = useNavigation();

  // Schema de validação com Yup
  const loginSchema = yup.object().shape({
    email: yup.string().required('O campo email é obrigatório').email('Insira um email válido'),
    senha: yup.string().required('O campo senha é obrigatório').min(7, 'A senha deve ter pelo menos 7 caracteres'),
  });

  const [email, setEmail] = useState('lucas.moreno@portalsesisp.org.br');
  const [senha, setSenha] = useState('Sesisp@2643');
  const [ocultarSenha, setOcultarSenha] = useState(true);

  async function requisitarAutenticacao() {
    console.log('Iniciando a contactação da rota de LOGIN!');
    try {
      // Validação com Yup antes de enviar os dados
      await loginSchema.validate({ email, senha });

      const resposta = await axios.post('/api/login', { email, senha }, { abortEarly: false });


      if (resposta && resposta.data && resposta.data.token) {
        const { token } = resposta.data;

        // Armazenando o token no asyncStorage
        await AsyncStorage.setItem("token", token);


        console.log("Login bem-sucedido!");
        navigation.navigate("tela_entrada");

      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ops! Ocorreu um erro ao autenticar!',
          textBody: 'Por favor, verifique suas credenciais.',
        });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Ops! Ocorreu um erro de validação!',
          textBody: error.message,
        });
        console.log('Ocorreu um erro de Yup Validação!')

      } else {
        console.log("Erro de conexão: ", error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ops! Ocorreu um erro de conexão!',
          textBody: 'Tente novamente mais tarde.',
        });

        console.log('Ocorreu um erro de conexão!')
      }
    }
  }



  return (
    <AlertNotificationRoot>
      <View style={styles.base}>
        <Image
          source={require('../Imagens/FerramentasConhecimento.png')}
          style={styles.background}
        />
        <View style={styles.container}>
          <Image style={styles.imagem} source={require('../Imagens/LogoDoApp.png')} />

          <View style={{ width: '80%', marginBottom: 100 }}>
            <CaixaDeTextoLogCad
              texto="Email do usuário:"
              placeholder="Insira o seu email"
              emoji={require('../Imagens/IconePessoa.png')}
              onChangeText={setEmail}
              valor={email}
            />

            <View style={styles.inputContainer}>
              <CaixaDeTextoLogCad
                texto="Senha do usuário:"
                placeholder="Insira a sua senha"
                emoji={require('../Imagens/IconeCadeado.png')}
                onChangeText={(texto) => setSenha(texto)}
                valor={senha}
                secureTextEntry={ocultarSenha}
              />
              <TouchableOpacity style={styles.icon} onPress={() => setOcultarSenha(!ocultarSenha)}>
                <Ionicons name={ocultarSenha ? "eye" : "eye-off"} color="#132B47" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.botao} onPress={requisitarAutenticacao}>
            <Text style={{ color: 'white', fontSize: 25 }}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },
  container: {
    alignItems: 'center',
  },
  imagem: {
    width: 220,
    height: 170,
    top: 15,
    marginBottom: 50,
  },
  botao: {
    backgroundColor: '#132B47',
    width: 271,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    top: 180,
    width: 395,
    height: 631,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 20,
    height: 25,
  },
});
