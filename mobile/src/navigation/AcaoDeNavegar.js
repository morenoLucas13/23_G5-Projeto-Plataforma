import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// COMPONENTES
import Login from '../Telas/Login.js';
import Cadastro from '../Telas/Cadastro.js';
import Home from '../Telas/Home.js'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="tela_login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="tela_entrada" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="tela_cadastro" component={Cadastro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}