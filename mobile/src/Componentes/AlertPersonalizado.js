// import { StyleSheet, Text } from 'react-native';
// import React from 'react';
// import { Dialog, Portal } from 'react-native-paper';
// import { Provider as PaperProvider } from 'react-native-paper';

// export default function AlertPersonalizado({ visible, mensagem, tipo, fecharCaixaDialogo }) {
//     return (
//         <PaperProvider>
//             <Portal>
//                 <Dialog visible={visible} onDismiss={fecharCaixaDialogo}>
//                     <Dialog.Icon icon={tipo} />
//                     <Dialog.Title style={styles.title}>Atenção! 🚨</Dialog.Title>
//                     <Dialog.Content>
//                         <Text variant="bodyMedium">{mensagem}</Text>
//                     </Dialog.Content>
//                 </Dialog>
//             </Portal>
//         </PaperProvider>
//     );
// }

// const styles = StyleSheet.create({
//     title: {
//         textAlign: 'center',
//     },
// });


// // const [exibir, setExibir] = useState(false)

// // const fecharCaixaDialogo = () => setExibir(false);