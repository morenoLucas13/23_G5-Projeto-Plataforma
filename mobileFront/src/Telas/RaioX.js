import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';
import Graficos from '../Componentes/Graficos.js';

export default function RaioX() {
    return (
        <View style={styles.container}>
            <CardCabecalho
                texto={'Relatório do Estudante'}
                navegacao={'tela_entrada'}
            />

            {/*  */}
            <Graficos />

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
    }
})