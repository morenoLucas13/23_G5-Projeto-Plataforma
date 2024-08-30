import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const CarouselDeImagens = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 6000); // 6 segundos de intervalo

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ref={flatListRef}
      onMomentumScrollEnd={(event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: 100,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 20
  },
});

export default CarouselDeImagens;