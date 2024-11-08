import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

import CardCabecalho from '../Componentes/CardCabecalho';

// Dados do ranking
const rankingData = [
    { posicao: 1, nome: 'Rafael Silva Tomasetti', pontos: 2349 },
    { posicao: 2, nome: 'Lucas Neponuceno Moreno', pontos: 1989 },
    { posicao: 3, nome: 'Alana Silva de Freitas', pontos: 1581 },
    { posicao: 4, nome: 'Maria Heloiza Silva Souza', pontos: 1234 },
    { posicao: 5, nome: 'Eduan de Faria Tebar', pontos: 1201 },
    { posicao: 6, nome: 'Marianny Alves Floriano dos Santos', pontos: 1133 },
    { posicao: 7, nome: 'Ana Lidia de Oliveira Batista', pontos: 1129 },
    { posicao: 8, nome: 'Matheus Balarim de Sant\'anna', pontos: 999 },
    { posicao: 9, nome: 'Raissa Chagas Furlan', pontos: 991 },
    { posicao: 10, nome: 'Victor Lucas Jurasseke Sales', pontos: 666 }
];

// Componente para renderizar cada item do ranking
const RankingItem = ({ posicao, nome, pontos }) => {
    // Função para definir a cor da posição
    const EstilosDasPosicoes = (posicao) => {
        switch (posicao) {
            case 1:
                return styles.posicaoOuro;
            case 2:
                return styles.posicaoPrata;
            case 3:
                return styles.posicaoBronze;
            default:
                return styles.posicao;
        }
    };

    return (
        <View style={styles.rankingItem}>
            {/* Condicional para criar a View apenas para as três primeiras posições */}
            {posicao <= 3 ? (
                <View style={styles.viewPosicao}>
                    <Text style={EstilosDasPosicoes(posicao)}>{posicao}</Text>
                </View>
            ) : (
                <Text style={EstilosDasPosicoes(posicao)}>{posicao}</Text>
            )}
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.pontos}>{pontos}</Text>
        </View>
    );
};


export default function Ranking() {
    return (
        <View style={styles.container}>
            <CardCabecalho
                texto={'Ranking dos Estudantes'}
                navegacao={'tela_entrada'}
            />

            <View>
                <Text style={styles.fontEmoji}>👑✨</Text>
            </View>

            <View style={styles.divisor} />

            <FlatList
                data={rankingData}
                keyExtractor={(item) => item.posicao.toString()}
                renderItem={({ item }) => (
                    <RankingItem
                        posicao={item.posicao}
                        nome={item.nome}
                        pontos={item.pontos}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FA',
        paddingBottom: 1,
        alignItems: 'center',
    },
    fontEmoji: {
        fontSize: 48,
        paddingVertical: 15,
    },
    divisor: {
        height: 1,
        width: '95%',
        backgroundColor: '#BCBCC1',
        marginVertical: 5,
    },
    rankingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    viewPosicao: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    posicao: {
        fontSize: 18,
        fontWeight: '900',
        color: '#6D72B8',
        textAlign: 'center',
    },
    posicaoOuro: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFC700',
        backgroundColor: '#FDE966',
        borderWidth: 2,
        borderColor: '#FFC700',
        borderRadius: 50,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40
    },
    posicaoPrata: {
        fontSize: 18,
        fontWeight: '900',
        color: '#AAC0D5',
        backgroundColor: '#D9E3ED',
        borderWidth: 2,
        borderColor: '#AAC0D5',
        borderRadius: 50,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40
    },
    posicaoBronze: {
        fontSize: 18,
        fontWeight: '900',
        color: '#D09259',
        backgroundColor: '#F8BE8E',
        borderWidth: 2,
        borderColor: '#D09259',
        borderRadius: 50,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40
    },
    nome: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: '#333',
        fontWeight: '800'
    },
    pontos: {
        fontSize: 16,
        fontWeight: '900',
        backgroundColor: '#6D72B8',
        color: '#ffff',
        borderRadius: 10,
        width: 50,
        height: 34,
        textAlign: 'center',
        lineHeight: 34
    },
});
