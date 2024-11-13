import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

export default function Graficos() {
    const widthAndHeight = 250
    const series = [66, 34]
    const sliceColor = ['#73EAA1', '#FF4C4C']

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Levanta a cabeça princesa se não a coroa caí! 👑✨</Text>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                />
            </View>

            <View style={{ alignItems: 'center' }}>

                <Text style={styles.legenda}>
                    Total de questões do simulado: 4
                </Text>

                <Text style={styles.legenda}>
                    Questões feitas: {series[0] + series[1]}
                </Text>

                <Text style={styles.legenda}>
                    Total de acertos: {series[0]}
                </Text>

                <Text style={styles.legenda}>
                    Total de erros: {series[1]}
                </Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        margin: 10,
        textAlign: 'center'
    },
    legenda: {
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold'
    }
});