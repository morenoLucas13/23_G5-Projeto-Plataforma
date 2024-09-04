import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';
import BotoesSmp from '../Componentes/BotoesSmp';

export default function Simulado() {
    const [mostrarOpcoesAleatorio, setMostrarOpcoesAleatorio] = useState(false);
    const [mostrarOpcoesProfessor, setMostrarOpcoesProfessor] = useState(false);

    const mostrarSimuladoAleatorio = () => {
        setMostrarOpcoesAleatorio(true);
        setMostrarOpcoesProfessor(false);
    };

    const mostrarSimuladoProfessor = () => {
        setMostrarOpcoesProfessor(true);
        setMostrarOpcoesAleatorio(false);
    };

    const navegarParaTela1 = () => {

    };

    const navegarParaTela2 = () => {

    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <CardCabecalho
                texto={'SIMULADOS'}
                navegacao={'tela_entrada'}
            />

            {/* Emoji */}
            <View>
                <Text style={styles.txtEmoji}> 👑✨</Text>
            </View>

            {/* Botões */}
            <View style={{ flexDirection: 'row' }}>
                <BotoesSmp
                    texto={'Simulado Aleatório'}
                    onPress={mostrarSimuladoAleatorio}
                />
                <BotoesSmp
                    texto={'Simulado pelo Professor'}
                    onPress={mostrarSimuladoProfessor}
                />
            </View>

            {/* Texto informativo */}
            <View>
                <Text style={styles.txtMain}>
                    Este simulado deve ser feito com seriedade, anote suas principais dúvidas para posteriormente pesquisar. 😉
                </Text>
            </View>

            {/* Simulado Aleatório */}
            {mostrarOpcoesAleatorio && (
                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={navegarParaTela1}
                    >
                        <View style={{ paddingRight: 10 }}>
                            <Image style={{ width: 40, height: 40 }} source={require('../Imagens/IconeSimulado.png')} />
                        </View>
                        <Text style={styles.txtDinamico}>Iniciar Simulado Aleatório</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Simulado feito pelo Professor */}
            {mostrarOpcoesProfessor && (
                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={navegarParaTela2}
                    >
                        <View style={{ paddingRight: 10 }}>
                            <Image style={{ width: 40, height: 40 }} source={require('../Imagens/IconeSimulado.png')} />
                        </View>
                        <Text style={styles.txtDinamico}>Iniciar Simulado feito pelo Professor</Text>
                    </TouchableOpacity>
                </View>
            )}

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
    txtEmoji: {
        fontSize: 48
    },
    txtMain: {
        fontSize: 20,
        textAlign: 'center',
        padding: 50
    },
    txtDinamico: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    btn: {
        backgroundColor: '#6D72B8',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        width: 250,
        height: 60,
        paddingHorizontal: 10
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