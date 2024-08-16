import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';



export default function BotoesDeNavegacao({ texto, icone }) {

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.botao}>
                <Image
                    style={styles.icone}
                    source={icone}
                />

                <Text style={styles.texto}>{texto}</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    botao: {
        width: 110,
        height: 110,
        backgroundColor: '#6D72B8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icone: {
        width: 60,
        height: 60
    },
    texto: {
        fontSize: 17,
        color: '#FFFF',
    }
});