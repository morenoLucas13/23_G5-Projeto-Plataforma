import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import * as api from '../api';

// COMPONENTES
import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad';

export default function Login() {

  const navigation = useNavigation();

  function navegar() {
    navigation.navigate('tela_cadastro');
  }

  const [email, setEmail] = useState('lucas.moreno@portalsesisp.org.br');
  const [senha, setSenha] = useState('Sesisp@2643');
  const [ocultarSenha, setOcultarSenha] = useState(true);

  const loginSchema = yup.object().shape({
    email: yup.string().required('O campo email é obrigatório').email('Insira um email válido'),
    senha: yup.string().required('O campo senha é obrigatório').min(7, 'A senha deve ter pelo menos 7 caracteres'),
  });

  async function requisitarAutenticacao() {
    try {
      // await loginSchema.validate({ email, senha });

      // let resp = await api.requisitarPost('/api/login', { email, senha });

      // console.log("== Status Code ==");
      // console.log(resp.status);
      // console.log("== Dados ==");
      // console.log(resp.data);

      // if (resp.status == 200) {
      //   if (resp.data.sucesso) {
      //     console.log("+++ SUCESSO +++");
      navigation.navigate('tela_entrada');
      //     } else {
      //       console.log('+++ Login inválido +++')
      //       console.log(resp.data.erro);
      //     }
      //   } else {
      //     console.log('Não foi possível concluir a operação!');
      //   }
    } catch (error) {
      //   if (error.name === 'ValidationError') {
      //     Alert.alert('Erro de Validação 🚨', error.errors.join('\n'));
      //   } else {
      //     console.log('Ops. Não foi possível se comunicar com o servidor!');
      //     Alert.alert('Erro de Conexão 🚨', 'Não foi possível se comunicar com o servidor!');
    }
    //   console.log(error);
    // }
  }

  return (
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

          {/* <TouchableOpacity onPress={navegar}>
            <Text style={styles.textoBotao}>Você ainda não se CADASTROU?</Text>
          </TouchableOpacity> */}
          
        </View>

        <TouchableOpacity style={styles.botao} onPress={requisitarAutenticacao}>
          <Text style={{ color: 'white', fontSize: 25 }}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
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
  // textoBotao: {
  //   color: '#132B47',
  //   fontSize: 15,
  //   textAlign: 'center',
  //   textDecorationLine: 'underline',
  // },
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

