import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// COMPONENTES
import Login from '../Telas/Login.js';
import Cadastro from '../Telas/Cadastro.js';
import Home from '../Telas/Home.js';
import Simulados from '../Telas/Simulados.js';
import RaioX from '../Telas/RaioX.js';
import Chat from '../Telas/Chat.js';
import SelecionarSimulados from '../Telas/SelecionarSimulados.js';
import Questoes from '../Telas/Questoes.js';

const Stack = createNativeStackNavigator();

export default function AcaoDeNavegar() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="tela_login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="tela_entrada" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="tela_cadastro" component={Cadastro} />
                <Stack.Screen options={{ headerShown: false }} name="tela_simulados" component={Simulados} />
                <Stack.Screen options={{ headerShown: false }} name="tela_relatorio" component={RaioX} />
                <Stack.Screen options={{ headerShown: false }} name="tela_chat" component={Chat} />
                <Stack.Screen options={{ headerShown: false }} name="tela_selecionar_simulado" component={SelecionarSimulados} />
                <Stack.Screen options={{ headerShown: false }} name="tela_questoes" component={Questoes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}