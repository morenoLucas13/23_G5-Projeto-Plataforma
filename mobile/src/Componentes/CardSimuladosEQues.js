import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function CardSimuladosEQues({disciplina, professor, enunciadoQuestao, quantidadeQuestoes}) {
    const navigation = useNavigation();

    const iniciarQuestoes = () => {
        navigation.navigate('tela_questoes')
    };
    return (
        <View style={{ paddingTop: 35 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{disciplina}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{professor}</Text>
            </View>

            <View style={styles.cardConteudo}>
                <View style={styles.textoInfo}>
                    <Text numberOfLines={6} style={{ fontSize: 15, fontStyle: 'italic', textAlign: 'justify' }}>{enunciadoQuestao}</Text>
                </View>
                <View style={{ backgroundColor: '#BCBCC1', width: 1, height: 110 }} />

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15 }}>
                    <TouchableOpacity style={{ width: 45, height: 45, paddingBottom: 70 }} onPress={iniciarQuestoes}>
                        <Image source={require('../Imagens/IconeLapis.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: '900' }}>{quantidadeQuestoes}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardConteudo: {
        backgroundColor: '#ffff',
        flexDirection: 'row',
        width: 318,
        height: 150,
        borderRadius: 16,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        elevation: 5,
    },
    textoInfo: {
        width: 230,
        height: 115,
        paddingHorizontal: 10
    }
})