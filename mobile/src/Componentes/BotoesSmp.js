import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BotoesSmp({ texto, onPress }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.botao}
                onPress={onPress}
            >
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
        width: 160,
        height: 45,
        backgroundColor: '#6D72B8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        fontSize: 15,
        color: '#FFFF',
        textAlign: 'center'
    }
});
