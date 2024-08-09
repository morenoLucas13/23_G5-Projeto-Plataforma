import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

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


export default function BotoesDeNavegacao({ texto, icone }) {

    [fontesCarregadas] = useFonts({ Poppins_700Bold })
    if (!fontesCarregadas) return null

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
        fontFamily: 'Poppins_700Bold',
        color: '#FFFF',
    }
});