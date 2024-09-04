import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';

export default function Chat() {
    return (
        <View style={styles.container}>
            <CardCabecalho
                texto={'Chat entre Estudantes e Professores'}
                navegacao={'tela_entrada'}
            />
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