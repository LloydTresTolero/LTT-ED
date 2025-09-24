import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../../firebase';

export default function AddAssignment() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title) return alert('Title is required');
    if (!deadline) return alert('Deadline is required');

    try {
      await addDoc(collection(db, 'assignments'), {
        userId: auth.currentUser.uid,
        title,
        deadline,
        createdAt: serverTimestamp(),
      });
      router.push('/assignment/list');
    } catch (error) {
      alert('Error adding assignment: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Assignment</Text>
      <TextInput
        placeholder="Assignment Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        placeholder="Deadline (e.g. 2025-10-05)"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <View style={styles.buttonWrapper}>
        <Button title="Add Assignment" onPress={handleAdd} color="#1a7431" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0b0b', // black background
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a7431', // green
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#1a7431', // green border
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: '#111', // dark input background
    color: '#fff', // white text inside
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
});
