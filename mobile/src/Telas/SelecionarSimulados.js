import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import CardCabecalho from '../Componentes/CardCabecalho';
import CardSimuladosEQues from '../Componentes/CardSimuladosEQues';

export default function SelecionarSimulados() {
    const [simulados, setSimulados] = useState([]);

    const fetchSimulados = async () => {
        try {
            const resposta = await api.get('/api/alunos/simulados/agendados');
            if (resposta.data.sucesso) {
                setSimulados(resposta.data.simulados);
            } else {
                setSimulados([]); // Evita estado inconsistente
            }
        } catch (error) {
            console.error('Erro ao buscar simulados:', error);
        }
    };


    // Chamada para obter os simulados quando o componente for montado
    useEffect(() => {
        fetchSimulados();
    }, []);

    return (
        <View style={styles.container}>
            <CardCabecalho texto="Selecione o Simulado" navegacao="tela_entrada" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled"
            >

                <Text style={styles.textIntro}>Qual simulado você deseja realizar? 🤔</Text>

                {simulados.map((simulado) => {
                    const primeiroNomeProfessor = simulado.professor.split(" ")[0];
                    return (
                        <CardSimuladosEQues
                            key={simulado.id} // Corrigido para usar a propriedade correta
                            disciplina={simulado.disciplina}
                            professor={primeiroNomeProfessor}
                            enunciadoQuestao={simulado.descricao}
                            quantidadeQuestoes={simulado.quantidadeQuestoes}
                            idSimulado={simulado.id} // Certifique-se de passar o ID corretamente aqui também
                        />
                    );
                })}


            </ScrollView>

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
