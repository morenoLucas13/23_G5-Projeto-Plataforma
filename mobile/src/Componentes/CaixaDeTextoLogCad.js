import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

export default function CaixaDeTextoLogCad ({ texto, placeholder, emoji, valor, onChangeText }) {

    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.titulo}>{texto}</Text>


            <View style={{ flexDirection: 'row', padding: 7 }}>
                <Image style={{ left: -7 }} source={emoji} />

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={valor}
                    onChangeText={onChangeText}
                />

            </View>
            <View style={{ height: 1, width: "100%", backgroundColor: '#BCBCC1' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 17,
        color: "#132B47",
        textAlign: 'left'
    },
    input: {
        width: "90%"
    }
});