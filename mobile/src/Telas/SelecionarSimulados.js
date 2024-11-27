import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig'; // Importa a instância do Axios configurada
import CardCabecalho from '../Componentes/CardCabecalho';
import CardSimuladosEQues from '../Componentes/CardSimuladosEQues';

export default function SelecionarSimulados() {
    const [simulados, setSimulados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar os simulados
    const fetchSimulados = async () => {
        try {
            const resposta = await api.get('/api/agendados'); // Utiliza a instância configurada do Axios

            if (resposta.data.sucesso) {
                setSimulados(resposta.data.simulados);
            } else {
                console.log('Nenhum simulado encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar simulados:', error);
        } finally {
            setLoading(false);
        }
    };

    // Chamada para obter os simulados quando o componente for montado
    useEffect(() => {
        fetchSimulados();
    }, []);

    return (
        <View style={styles.container}>
            <CardCabecalho texto="Selecione o Simulado" navegacao="tela_entrada" />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.textIntro}>Qual simulado você deseja realizar? 🤔</Text>

                    {simulados.map((simulado, index) => (
                        <CardSimuladosEQues
                            key={index}
                            disciplina={simulado.disciplina}
                            professor={simulado.professor}
                            enunciadoQuestao={simulado.descricao}
                            quantidadeQuestoes={12} // Alterar conforme o número de questões reais
                        />
                    ))}
                </ScrollView>
            )}

            <View style={styles.cardFechamentoTela} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FA',
        alignItems: 'center',
    },
    textIntro: {
        paddingTop: 40,
        fontSize: 18,
    },
    cardFechamentoTela: {
        width: '100%',
        height: 60,
        backgroundColor: '#132B47',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
});
