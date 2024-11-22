import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// 
import CardCabecalho from '../Componentes/CardCabecalho'
import CardSimuladosEQues from '../Componentes/CardSimuladosEQues'

export default function SelecionarSimulados() {
    return (
        <View style={styles.container}>
            <CardCabecalho
                texto={'Selecione o Simulado'}
                navegacao={'tela_entrada'}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textIntro}>Qual simulado você dejesa realizar? 🤔</Text>

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

                <CardSimuladosEQues
                    disciplina={'Biologia'}
                    professor={'Fabio Teruo Takahashi'}
                    enunciadoQuestao={'Para identificar o corpo, os peritos devem verificar se há homologia entre o DNA mitocondrial do rapaz e o DNA mitocondrial do(a)'}
                    quantidadeQuestoes={12} />

            </ScrollView>

            <View style={styles.cardFechamentoTela} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FA',
        alignItems: 'center'
    },
    textIntro: {
        paddingTop: 40,
        fontSize: 18
    },
    cardFechamentoTela: {
        width: '100%',
        height: 60,
        backgroundColor: '#132B47',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }
})