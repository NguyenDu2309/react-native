import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    if(!todo){
      alert('Please enter a todo');
      return;
    }
    setListTodo([...listTodo, {id: randomInterger(1, 200000000), name: todo} ]);
    setTodo('');
  }

  const handleDeleteTodo = (id: number) => {
    const newTodo = listTodo.filter(todo => todo.id !== id);
    setListTodo(newTodo);
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Text style={styles.header}>ToDo App</Text>

      {/* form */}
      <View style={styles.body}>
        <TextInput 
        style ={styles.todoInput} 
        placeholder="Enter your todo" 
        value = {todo}
        onChangeText={(value) => setTodo(value)}
        />
        <Button title="Add Todo" 
        onPress = {handleAddTodo}
        />  
      </View>

      {/* list todo */}
      <View style={styles.body}>
       <FlatList 
        data={listTodo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => 
        {
        return (
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Text style={styles.todoItem}>{item.name}</Text>
        </TouchableOpacity>
        )
        }}
       />
      </View>
    </View>
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
    fontSize: 18,
  },
});
