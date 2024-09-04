import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaixaDeTextoLogCad({ texto, placeholder, emoji, valor, onChangeText, secureTextEntry, toggleVisibility }) {
    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.titulo}>{texto}</Text>

            <View style={styles.inputContainer}>
                <Image style={styles.emoji} source={emoji} />

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={valor}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
    },
    emoji: {
        left: -7,
    },
    input: {
        width: "90%"
    }
});