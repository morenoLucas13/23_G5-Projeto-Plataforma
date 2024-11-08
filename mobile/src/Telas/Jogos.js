import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

// COMPONENTES
import CardCabecalho from '../Componentes/CardCabecalho';

const colors = ['red', 'blue', 'green', 'yellow'];

export default function Jogos() {
    const [gameSequence, setGameSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Função para iniciar o jogo e gerar nova sequência
    const startGame = () => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        setGameSequence((prevSequence) => [...prevSequence, newColor]);
        setPlayerSequence([]);
        setCurrentIndex(0);
        setIsPlayerTurn(false);

        setTimeout(() => {
            playSequence([...gameSequence, newColor]);
        }, 500);
    };

    // Função para tocar a sequência
    const playSequence = async (sequence) => {
        for (let color of sequence) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    flashColor(color);
                    resolve();
                }, 600);
            });
        }
        setIsPlayerTurn(true);
    };

    // Função para piscar a cor do botão
    const flashColor = (color) => {
        Alert.alert("Flash", `Flash: ${color}`, [{ text: "OK" }], {
            cancelable: true,
        });
    };

    // Função que trata o clique do jogador
    const handleColorPress = (color) => {
        if (!isPlayerTurn) return;

        setPlayerSequence((prevSequence) => [...prevSequence, color]);

        if (color === gameSequence[currentIndex]) {
            if (currentIndex + 1 === gameSequence.length) {
                Alert.alert('Success', 'Sequence complete! Adding another color...');
                startGame();
            } else {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        } else {
            Alert.alert('Game Over', 'You lost! Try again.');
            resetGame();
        }
    };

    // Função para reiniciar o jogo
    const resetGame = () => {
        setGameSequence([]);
        setPlayerSequence([]);
        setIsPlayerTurn(false);
        setCurrentIndex(0);
    };

    return (
        <View style={styles.container}>
            <CardCabecalho texto={'SIMON GAME!'} navegacao={'tela_entrada'} />

            <View style={styles.gameContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={() => handleColorPress('red')}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'blue' }]}
                    onPress={() => handleColorPress('blue')}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => handleColorPress('green')}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'yellow' }]}
                    onPress={() => handleColorPress('yellow')}
                />
            </View>

            <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>Start Game</Text>
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
    gameContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    button: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    },
    startButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
