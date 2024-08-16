import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// COMPONENTES
import CaixaDeTextoLogCad from '../Componentes/CaixaDeTextoLogCad'
import CheckBoxNivel from '../Componentes/CheckBoxNivel';

export default function Cadastro() {

    const [statusProfessor, setStatusProfessor] = useState(false);
    const [statusAluno, setStatusAluno] = useState(false);

    const handleCheckBoxChange = (cargo) => {
        if (cargo === 'Professor') {
            setStatusProfessor(!statusProfessor);
            if (!statusProfessor) setStatusAluno(false);
        } else if (cargo === 'Aluno') {
            setStatusAluno(!statusAluno);
            if (!statusAluno) setStatusProfessor(false);
        }
    };

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
                        texto="Email do usuário:"
                        placeholder="Insira seu email escolar"
                        emoji={require('../Imagens/IconeEmail.png')}
                    />

                    <CaixaDeTextoLogCad
                        texto="Senha do usuário:"
                        placeholder="Insira a sua senha"
                        emoji={require('../Imagens/IconeCadeado.png')}
                    />
                </View>

                <View style={{ marginTop: -80, marginBottom: 30 }}>
                    <Text style={styles.textoDeNivel}>Nível De Acesso:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBoxNivel
                            cargo="Professor"
                            checado={statusProfessor}
                            onMarcarItem={() => handleCheckBoxChange('Professor')}
                        />

                        <CheckBoxNivel
                            cargo="Aluno"
                            checado={statusAluno}
                            onMarcarItem={() => handleCheckBoxChange('Aluno')}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.botao}>
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
    }
});