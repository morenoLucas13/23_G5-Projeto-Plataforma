import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Alternativas({ letraAlternativa, }) {
  return (
    <>
      <TouchableOpacity style={styles.cardAlternativa}>

        <Text>{letraAlternativa}</Text>

        <Text>participação sociopolítica.</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  cardAlternativa: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    width: 290,
    height: 32,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 5,
    borderColor: '#000',
    borderWidth: 1
  }
})