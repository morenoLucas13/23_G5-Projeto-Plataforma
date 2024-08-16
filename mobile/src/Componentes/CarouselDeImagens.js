// import React, { Component } from "react";
// import { StyleSheet, Text, View } from "react-native";

// import { SliderBox } from "react-native-image-slider-box";

// export default class CarouselDeImagens extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       images: [
//         "https://i.pinimg.com/564x/51/79/cc/5179cc6fa5ef973931805bf98c60a0e4.jpg",
//         "https://i.pinimg.com/564x/a1/36/4a/a1364a778769583350f163d5089c4a4f.jpg",
//         "https://i.pinimg.com/736x/f5/b4/58/f5b4580c94d201cb28d263d727baca58.jpg",
//         "https://i.pinimg.com/564x/a1/86/40/a186406b80284eabc5130f39f5fff205.jpg",
//         require('../Imagens/IconePontuacao.png'),
//       ]
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <SliderBox
//           images={this.state.images}
//           onCurrentImagePressed={index =>
//             console.warn(`image ${index} pressed`)
//           }
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });

// ======================================================================================

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CarouselDeImagens() {
  return (
    <View>
      <Text>CarouselDeImagens</Text>
    </View>
  )
}

const styles = StyleSheet.create({})