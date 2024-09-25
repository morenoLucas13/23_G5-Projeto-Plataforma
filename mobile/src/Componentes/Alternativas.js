import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Alternativas({letraAlternativa, }) {
  return (
    <View style={styles.cardAlternativa}>

      <Text>{letraAlternativa}</Text>

      <Text>participação sociopolítica.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardAlternativa: {
        backgroundColor: '#FFFF',
        flexDirection: 'row',
        width: 290,
        height: 32,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})