import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';

export default function Jogos() {
    return (
        <View style={styles.container}>
            <CardCabecalho
                texto={'SIMON GAME!'}
                navegacao={'tela_entrada'}
            />

            <View>
                {/* Coloque o código aqui Código */}
            </View>

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