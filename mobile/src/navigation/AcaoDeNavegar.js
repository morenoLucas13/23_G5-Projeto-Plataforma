import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// COMPONENTES
import Login from '../Telas/Login.js';
import Cadastro from '../Telas/Cadastro.js';
import Entrada from '../Telas/Entrada.js'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="tela_login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="tela_entrada" component={Entrada} />
                <Stack.Screen options={{ headerShown: false }} name="tela_cadastro" component={Cadastro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}