import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as yup from 'yup';
import * as api from '../api';
import { Ionicons } from '@expo/vector-icons';

// COMPONENTES
import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad';
import CheckBoxNivel from '../Componentes/CheckBoxNivel';

export default function Cadastro() {

    const navigation = useNavigation();

    // ========================================================================

    const [nome, setNome] = useState('André Lucas Costa');
    const [email, setEmail] = useState('andre.lucas2@portalsesisp.org.br');
    const [senha, setSenha] = useState('Sesisp@1111');
    const [ocultarSenha, setOcultarSenha] = useState(true);
    const [cargoSelecionado, setCargoSelecionado] = useState(null);

    // Criação de um esquema de validação usando Yup
    const cadastroSchema = yup.object().shape({
        nome: yup.string().required('Nome é obrigatório'),
        email: yup.string().required('O campo email é obrigatório').email('Insira um email válido'),
        senha: yup.string().required('O campo senha é obrigatório').min(7, 'A senha deve ter pelo menos 7 caracteres'),
        nivel_acesso: yup.number().required('O campo nível é obrigatório').oneOf([1, 2], 'O nível de acesso deve ser 1 ou 2.')
    });

    const manipularCheckBoxChange = (cargo) => {
        if (cargo === 'Professor') {
            setCargoSelecionado(cargoSelecionado === 1 ? null : 1); // Alterna entre 1 e null
        } else if (cargo === 'Aluno') {
            setCargoSelecionado(cargoSelecionado === 2 ? null : 2); // Alterna entre 2 e null
        }
    };

    async function requisitarCadastro() {
        try {
            // Validação dos dados antes de enviar a requisição
            await cadastroSchema.validate({ nome, email, senha, nivel_acesso: cargoSelecionado });

            const resp = await api.requisitarPost('/api/login/cadastrarUser', {
                nome,
                email,
                senha,
                nivel_acesso: cargoSelecionado
            });

            // Somente para visualizar os conteúdos das variáveis de resposta  
            console.log("== Status Code ==");
            console.log(resp.status);
            console.log("== Dados ==");
            console.log(resp.data);

            if (resp.status === 200) {
                if (resp.data.sucesso) {
                    console.log("+++ SUCESSO +++");
                    navigation.navigate('tela_entrada');
                } else {
                    console.log('+++ Cadastro inválido +++');
                    console.log(resp.data.erro);
                    Alert.alert('Cadastro inválido', resp.data.erro || 'Ocorreu um erro ao cadastrar.');
                }
            } else {
                console.log('Ops. Não foi possível concluir a operação.');
                console.log(resp.data.erro);
                Alert.alert('Ocorreu um erro ao cadastrar!', resp.data.erro || 'Erro desconhecido.');
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                Alert.alert('Erro de Validação', error.errors.join('\n'));
            } else {
                console.log('Ops. Não foi possível se comunicar com o servidor.');
                Alert.alert('Erro de Conexão', 'Não foi possível se comunicar com o servidor :(');
            }
            console.log(error);
        }
    }

    // ========================================================================

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
                        onChangeText={setNome}
                        valor={nome}
                    />

                    <CaixaDeTextoLogCad
                        texto="Email do usuário:"
                        placeholder="Insira seu email escolar"
                        emoji={require('../Imagens/IconeEmail.png')}
                        onChangeText={setEmail}
                        valor={email}
                    />

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

                <View style={{ marginTop: -80, marginBottom: 30 }}>
                    <Text style={styles.textoDeNivel}>Nível de Acesso:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBoxNivel
                            cargo="Professor"
                            checado={cargoSelecionado === 1}
                            onMarcarItem={() => manipularCheckBoxChange('Professor')}
                        />

                        <CheckBoxNivel
                            cargo="Aluno"
                            checado={cargoSelecionado === 2}
                            onMarcarItem={() => manipularCheckBoxChange('Aluno')}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.botao} onPress={requisitarCadastro}>
                        <Text style={{ color: 'white', fontSize: 25 }}>
                            Cadastrar
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
        alignItems: 'center',
        marginBottom: -100
    },
    background: {
        top: 180,
        width: 395,
        height: 631,
        position: 'absolute'
    },
    textoDeNivel: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '900'
    },
    icon: {
       
        right: 20,
        height: 25,
        
      },
});
