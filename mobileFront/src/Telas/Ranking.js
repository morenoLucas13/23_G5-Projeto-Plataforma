import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import api from '../api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MEUS COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';

// Componente para renderizar cada item do ranking
const RankingItem = ({ posicao, nome, pontos }) => {
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
    const [rankingDados, setRankingDados] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const buscarRanking = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            console.log('Token recuperado no mobile:', token);


            if (!token) {
                throw new Error('Token não encontrado no AsyncStorage!');
            }

            const resposta = await api.get('/api/relatorios/rankingGeral', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            
            console.log('Resposta completa da API:', resposta);
            console.log('Dados da resposta:', resposta.data);


            setRankingDados(resposta.data || [])
        } catch (error) {
            console.log('Erro ao buscar dados do ranking:', error.message || error);
            const mensagemErro =
                error.response?.status === 401
                    ? 'Token inválido ou expirado. Por favor, faça login novamente.'
                    : 'Houve um problema ao carregar o ranking. Tente novamente mais tarde.';
            Toast.show({
                type: ALERT_TYPE.WARNING,
                textBody: mensagemErro,
            });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarRanking();
    }, []);

    if (carregando) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6D72B8" />
                <Text>Carregando o ranking...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CardCabecalho texto={'Ranking dos Estudantes'} navegacao={'tela_entrada'} />

            <View>
                <Text style={styles.fontEmoji}>👑✨</Text>
            </View>

            <View style={styles.divisor} />

            {rankingDados.length > 0 ? (
                <FlatList
                    data={rankingDados}
                    keyExtractor={(item) => item.posicao.toString()}
                    renderItem={({ item, index }) => (
                        <RankingItem posicao={index + 1} nome={item.nome} pontos={item.pontos} />
                    )}
                />
            ) : (
                <Text style={styles.textoNenhumDado}>Nenhum dado disponível no ranking.</Text>
            )}
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
        borderColor: '#000',
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
        lineHeight: 40,
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
        lineHeight: 40,
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
        lineHeight: 40,
    },
    nome: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: '#333',
        fontWeight: '800',
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
        lineHeight: 34,
    },
    textoNenhumDado: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});
