import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

//
import CardCabecalho from '../Componentes/CardCabecalho'
import Alternativas from '../Componentes/Alternativas'

export default function Questoes() {
  return (
    <View style={{ alignItems: 'center' }}>
      <CardCabecalho
        texto={'Questão'}
        navegacao={'tela_simulados'}
      />

      <View style={styles.cardQuestao}>
        <ScrollView>
          <Text style={styles.txtQuestao}>(ENEM 2023)
            TEXTO I
            Como presença consciente no mundo não posso escapar à responsabilidade ética no meu mover-me no mundo. Se sou puro produto da determinação genética ou cultural ou de classe, sou irresponsável pelo que faço no meu mover-me no mundo e, se careço de responsabilidade, não posso falar em ética.

            FREIRE, P. Pedagogia da autonomia: saberes necessários à prática educativa. São Paulo: Paz e Terra, 1996

            ТЕХТО II
            Paulo Freire construiu uma pedagogia da esperança. Na sua concepção, a história não é algo pronto e acabado. As estruturas de opressão e as desigualdades, apesar de serem naturalizadas, são sócio e historicamente construídas. Daí a importância de os educandos tomarem consciência da sua realidade para, assim, transformá-la.

            DEMARCHI, J. L. Paulo Freire. Disponivel em: https://diplomatique.org.br. Acesso em: 6 out. 2021 (adaptado).
          </Text>

          <Text style={[styles.txtQuestao, { paddingTop: 10 }]}>
            Com base no conceito de ética pedagógica presente nos textos, os educandos tornam-se responsáveis pela
          </Text>
        </ScrollView>
      </View>

      <ScrollView>
        <View style={{ marginTop: 20 }}>
          <Alternativas
            letraAlternativa={'A.'} />
          <Alternativas
            letraAlternativa={'B.'} />
          <Alternativas
            letraAlternativa={'C.'} />
          <Alternativas
            letraAlternativa={'D.'} />
          <Alternativas
            letraAlternativa={'E.'} />
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  cardQuestao: {
    width: 380,
    height: 400,
    backgroundColor: '#B6B9EF',
    borderRadius: 10,
    marginTop: 45,
    padding: 10,
    elevation: 10
  },
  txtQuestao: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify'
  }
})