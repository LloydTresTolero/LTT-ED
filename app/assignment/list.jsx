import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase';

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorMsg('User not logged in.');
          setAssignments([]);
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'assignments'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssignments(data);
      } catch (error) {
        setErrorMsg('Failed to load assignments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: '/assignment/edit', params: { id: item.id } })}
    >
      <Text style={styles.title}>{item.title}</Text>
      {item.deadline ? <Text style={styles.deadline}>Deadline: {item.deadline}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home1')}>
        <Text style={styles.homeButtonText}>◀ Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Assignments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1a7431" style={styles.loading} />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : assignments.length === 0 ? (
        <Text style={styles.emptyText}>You have no assignments yet. Start adding some!</Text>
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b', // black background
    padding: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a7431', // green
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#111',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1a7431',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  deadline: {
    fontSize: 14,
    color: '#1a7431',
    marginTop: 6,
  },
  loading: {
    marginTop: 40,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginTop: 30,
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: '#1a7431',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 2,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
