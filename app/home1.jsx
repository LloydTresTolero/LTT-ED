import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../firebase';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Welcome to EduTasker 🎓</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('assignment/list')}
          >
            <Text style={styles.buttonText}>📋 View Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('assignment/add')}
          >
            <Text style={styles.buttonText}>➕ Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark theme background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#00c853', // green accent
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00c853',
    shadowColor: '#00c853',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#00c853',
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#d32f2f',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 16,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
