import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';

export default function Jogos() {
    const [sequence, setSequence] = useState([]);
    const [playerStep, setPlayerStep] = useState(0);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [flashColor, setFlashColor] = useState("");

    // Função para iniciar o jogo
    const startGame = () => {
        setSequence([]);
        setPlayerStep(0);
        setIsPlayerTurn(false);
        addColorToSequence();
    };

    // Adiciona uma cor aleatória à sequência
    const addColorToSequence = () => {
        const colors = ["green", "red", "blue", "yellow"];
        const randomColor = colors[Math.floor(Math.random() * 4)];
        setSequence((prevSequence) => [...prevSequence, randomColor]);
    };

    // Executa a sequência para o jogador
    const playSequence = () => {
        setIsPlayerTurn(false);
        let i = 0;

        const interval = setInterval(() => {
            setFlashColor(sequence[i]);
            setTimeout(() => setFlashColor(""), 500); // Remove o flash após 500ms
            i++;

            if (i >= sequence.length) {
                clearInterval(interval);
                setIsPlayerTurn(true);
                setPlayerStep(0);
            }
        }, 1000);
    };

    // Efeito para tocar a sequência automaticamente após atualização
    useEffect(() => {
        if (sequence.length > 0) {
            playSequence();
        }
    }, [sequence]);

    // Verifica se o jogador selecionou a cor correta
    const handlePlayerInput = (color) => {
        if (!isPlayerTurn) return;

        if (color === sequence[playerStep]) {
            if (playerStep + 1 === sequence.length) {
                setTimeout(() => {
                    setIsPlayerTurn(false);
                    addColorToSequence();
                }, 1000);
            } else {
                setPlayerStep(playerStep + 1);
            }
        } else {
            Alert.alert("Erro", "Você errou! Tente novamente.");
            startGame();
        }
    };

    return (
        <View style={styles.container}>
            <CardCabecalho texto={'Relatório do Estudante'} navegacao={'tela_entrada'} />

            <Text style={styles.title}>Simon Game</Text>
            <Text style={styles.intro}>Teste sua memória e siga a sequência de cores!</Text>
            <Text style={styles.count}>Nível: {sequence.length}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.green, flashColor === "green" && styles.flash]}
                    onPress={() => handlePlayerInput("green")}
                />
                <TouchableOpacity
                    style={[styles.button, styles.red, flashColor === "red" && styles.flash]}
                    onPress={() => handlePlayerInput("red")}
                />
                <TouchableOpacity
                    style={[styles.button, styles.blue, flashColor === "blue" && styles.flash]}
                    onPress={() => handlePlayerInput("blue")}
                />
                <TouchableOpacity
                    style={[styles.button, styles.yellow, flashColor === "yellow" && styles.flash]}
                    onPress={() => handlePlayerInput("yellow")}
                />
            </View>

            <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>INICIAR</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FA',
        paddingBottom: 100,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    intro: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    count: {
        fontSize: 24,
        color: '#333',
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 240,
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    },
    green: {
        backgroundColor: '#00A74A',
    },
    red: {
        backgroundColor: '#F82A15',
    },
    blue: {
        backgroundColor: '#0297EB',
    },
    yellow: {
        backgroundColor: '#FEF735',
    },
    flash: {
        opacity: 0.5,
    },
    startButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});
