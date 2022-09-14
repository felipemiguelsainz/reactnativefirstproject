import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';

//Estilos 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 50,
    marginBottom : 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input : {
    width: '75%',
    borderBottomColor: '#4A306D',
    borderBottomWidth: 1,
    height: 45,
    color: '#212121',
    fontSize: 15,
  },
  itemList : {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  itemContainer : {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9F848D',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
  },
  item : {
    fontSize: 16,
    color: '#212121',
  },
  modalContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16,
  }
});

//Renderizado

export default function App() {

  const [task, setTask] = useState(''); //Hook de tarea
  const [tasks, setTasks] = useState([]); //Hook de arreglo de tareas
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)
  const onHandleChangeText = (text) => {
    setTask(text);
  }

  console.warn('task', task)
  console.warn('tasks', tasks)

  const addItem = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), value: task },
    ])
    setTask('')
  }

  const onHandleDeleteItem = (id) => {
    setModalVisible(!modalVisible)
    setSelectedTask(tasks.find((item) => item.id === id))
    console.warn(id)
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <TouchableOpacity onPress={onHandleDeleteItem(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='New task' 
        style={styles.input} 
        selectionColor='#4A306D'
        placeholderTextColor='#4A306D'
        onChangeText={onHandleChangeText}
        value={task}
        />
        <Button 
        title='add' 
        onPress={(addItem)} 
        color='#4A306D'
        />
      </View>
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      >
      </FlatList>
      <Modal
        animationType='slide'
        visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modal}>Detalle de la lista</Text>
          </View>
      </Modal>
    </View>
  );
}


