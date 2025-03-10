import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={{ uri: 'file:///New%20folder/LiftOff/assets/images/welcome.png'}} />
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{ width: '100%', height: '70%' }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View entering={FadeInDown.delay(200).springify()} className="flex items-center">
          <TouchableOpacity
            onPress={() => router.push('/Signup')}
            style={{ height: 50, width: 200 }}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text style={{ fontSize: 20 }} className="text-white font-bold tracking-widest">
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/Login')}
            style={{ height: 50, width: 200 }}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text style={{ fontSize: 20 }} className="text-white font-bold tracking-widest">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;
