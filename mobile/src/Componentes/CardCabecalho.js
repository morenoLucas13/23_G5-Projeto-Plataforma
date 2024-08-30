import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

export default function cardCabecalho() {
    return (
        <View style={styles.cardCabeçalho}>
            <TouchableOpacity style={styles.btnRetornar}>
                <Image
                    source={require('../Imagens/botaoRetornar.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardCabeçalho: {
        width: '100%',
        height: 162,
        backgroundColor: '#132B47',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 20
    }
})