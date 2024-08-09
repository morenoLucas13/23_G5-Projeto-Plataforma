import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

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

import BotoesDeNavegacao from '../Componentes/BotoesDeNavegacao.js'

export default function Entrada() {

    [fontesCarregadas] = useFonts({ Poppins_700Bold })
    if (!fontesCarregadas) return null

    return (
        <View style={styles.container}>

            {/* View dos Elementos do Cabeçalho */}
            <View style={styles.cardCabeçalho}>
                <Text style={{ fontSize: 20, fontFamily: 'Poppins_700Bold', color: '#ffff', textAlign: 'center' }}>Seja bem-vindo,</Text>
                <Text style={{ fontSize: 24, fontFamily: 'Poppins_700Bold', color: '#ffff', textAlign: 'center' }}>Lucas Neponuceno Moreno</Text>

                <View style={styles.cardPontuacao}>
                    <Image
                        style={{ height: 45, width: 45 }}
                        source={require('../Imagens/IconePontuacao.png')}
                    />
                    <Text style={{ fontSize: 20, fontFamily: 'Poppins_700Bold', color: '#ffff', textAlign: 'center' }}>
                        666
                    </Text>
                </View>
            </View>

            {/* Texto */}
            <View style={{ width: '80%', marginTop: -170 }}>

                <Text style={{ fontSize: 22, fontFamily: 'Poppins_700Bold', textAlign: 'center' }}>
                    Tá curtindo seu dia?
                </Text>

                <Text style={{ fontSize: 22, fontFamily: 'Poppins_700Bold', textAlign: 'center' }}>
                    Até as princesas precisam estudar 📚🥺
                </Text>

            </View>

            <View style={{ height: 1, width: "100%", backgroundColor: '#BCBCC1', marginTop: 20, marginBottom: 20 }} />

            {/* Botões de Navegação */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                <BotoesDeNavegacao
                    icone={require('../Imagens/IconeSimulado.png')}
                    texto={'Simulado'}
                />

                <BotoesDeNavegacao
                    icone={require('../Imagens/IconeRelatorio.png')}
                    texto={'Raio-X'}
                />

                <BotoesDeNavegacao
                    icone={require('../Imagens/IconeChat.png')}
                    texto={'Bate-papo'}
                />

            </View>

            <View style={{ height: 1, width: "100%", backgroundColor: '#BCBCC1', marginTop: 20, marginBottom: 20 }} />

            {/* Carousel */}
            <View>

            </View>

            <View style={{
                width: '100%',
                height: 162,
                backgroundColor: '#132B47',
                position: 'absolute',
                top: 700,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40
            }} />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardCabeçalho: {
        width: '100%',
        height: 162,
        backgroundColor: '#132B47',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 20
    },
    cardPontuacao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6D72B8',
        height: 52,
        width: 154,
        borderRadius: 60,
        left: 119,
        paddingRight: 45,
        paddingLeft: 10
    }
});