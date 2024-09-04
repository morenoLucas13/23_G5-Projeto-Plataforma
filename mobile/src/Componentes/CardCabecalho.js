import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function cardCabecalho({ texto, navegacao }) {
    const navigation = useNavigation();

    return (
        <View style={styles.cardCabeçalho}>
            <TouchableOpacity style={styles.btnRetornar}
                onPress={() => navigation.navigate(navegacao)}
            >
                <Image
                    source={require('../Imagens/botaoRetornar.png')}
                />
            </TouchableOpacity>

            <Text style={styles.txtTela}>{texto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardCabeçalho: {
        width: '100%',
        height: 120,
        backgroundColor: '#132B47',
        flexDirection: 'row',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    txtTela: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})