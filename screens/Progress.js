import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const ProgressScreen = () => {
  const [usageData, setUsageData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    loadUsageData();
    trackUsage();
  }, []);

  const trackUsage = async () => {
    const today = new Date().getDay();
    let storedData = await AsyncStorage.getItem('weeklyUsage');
    let usageArray = storedData ? JSON.parse(storedData) : [0, 0, 0, 0, 0, 0, 0];
    
    usageArray[today] += 1; // Increase today's count
    setUsageData(usageArray);
    await AsyncStorage.setItem('weeklyUsage', JSON.stringify(usageArray));
  };

  const loadUsageData = async () => {
    let storedData = await AsyncStorage.getItem('weeklyUsage');
    if (storedData) {
      setUsageData(JSON.parse(storedData));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Progress</Text>
      <BarChart
        data={{
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: usageData }],
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          barPercentage: 0.5,
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProgressScreen;
