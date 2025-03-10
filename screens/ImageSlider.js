import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// Sample sliderImages array (Replace with actual image URIs)
const sliderImages = [
  { uri: 'https://th.bing.com/th/id/OIP.9EhDvHWCoFR_rvou7TbUFwHaE8?rs=1&pid=ImgDetMain' },
  { uri: 'https://media.istockphoto.com/id/598674710/photo/three-young-women-lifting-weights-in-a-fitness-club.jpg?s=612x612&w=0&k=20&c=bbUf__O2Ln5fydjfwptygETYf2ONUrXr1gbjLplh2Uk=' },
  { uri: 'https://th.bing.com/th/id/OIP.iwiHQ_2ladKttOc5yuxV5wHaE8?rs=1&pid=ImgDetMain' },
  { uri: 'https://th.bing.com/th/id/OIP.jhRA5ECY4QvOWgctWOolKwHaE8?rs=1&pid=ImgDetMain' },
];

const { width } = Dimensions.get('window');

export default function ImageSlider() {
  return (
    <Carousel
      data={sliderImages}
      loop={false}
      autoplay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={width} 
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={width - 70}
      slideStyle={{ display: 'flex', alignItems: 'center' }}
    />
  );
}

const ItemCard = ({ item, index }, parallaxProps) => {
  return (
    <View style={{ width: width - 70, height: 250 }}> 
      <ParallaxImage
        source={{ uri: item.uri }} // 
        containerStyle={{ borderRadius: 30, flex: 1 }}
        style={{ resizeMode: 'contain' }}
        parallaxFactor={0.3}
        {...parallaxProps}
      />
    </View>
  );
};
