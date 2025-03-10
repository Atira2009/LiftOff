import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Workout Completed!', description: 'You finished a chest workout!', timestamp: '2h ago', read: false },
    { id: '2', title: 'New Workout Added', description: 'Check out the latest back workouts.', timestamp: '1d ago', read: false },
    { id: '3', title: 'Reminder', description: 'Don’t forget to stretch before exercising.', timestamp: '3d ago', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read && styles.readNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  readNotification: {
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default NotificationsScreen;
