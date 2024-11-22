import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';

export default function CheckBoxNivel({ cargo, checado, onMarcarItem }) {
    return (
        <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
            <Text style={styles.textoCargo}>
                {cargo}
            </Text>

            <Checkbox
                status={checado ? 'checked' : 'unchecked'}
                uncheckedColor='black'
                color='#6D72B8'
                onPress={onMarcarItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textoCargo: {
        fontSize: 20,
        textAlign: 'center'
    }
})