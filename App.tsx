import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Todo {
  id: number;
  name: string;
}

export default function App() {

  const [todo, setTodo] = useState('');

  const [listTodo, setListTodo] = useState<Todo[]>([]);

  function randomInterger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddTodo = () => {
    if (!todo) {
      Alert.alert('Error', 'Please enter a todo',
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]

      );
      return;
    }
    setListTodo([...listTodo, { id: randomInterger(1, 200000000), name: todo }]);
    setTodo('');
  }

  const handleDeleteTodo = (id: number) => {
    const newTodo = listTodo.filter(todo => todo.id !== id);
    setListTodo(newTodo);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* header */}
        <Text style={styles.header}>ToDo App</Text>

        {/* form */}
        <View style={styles.body}>
          <TextInput
            style={styles.todoInput}
            placeholder="Enter your todo"
            value={todo}
            onChangeText={(value) => setTodo(value)}
          />
          <Button title="Add Todo"
            onPress={handleAddTodo}
          />
        </View>

        {/* list todo */}
        <View style={styles.body}>
          <FlatList
            data={listTodo}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.todoItem}>
                  <Text style={styles.todoText}>{item.name}</Text>

                  <TouchableOpacity
                    onPress={() => handleDeleteTodo(item.id)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={26}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e7b3b3',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 40,
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  todoInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  body: {
    padding: 20,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  todoText: {
    fontSize: 18,
    flex: 1,
  },
});
