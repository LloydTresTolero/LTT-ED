import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login'); // redirect to login first
    }, 1000); // small delay for splash/loading effect

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2ecc71" />
      <Text style={styles.text}>Loading EduTasker...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // black background
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: '#2ecc71', // green accent
    fontWeight: 'bold',
  },
});
