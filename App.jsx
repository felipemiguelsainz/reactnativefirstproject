import { AddTask, CustomModal } from './components/index';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
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
  const [tasks, setTasks] = useState([{id: 1, value: 'hola'}]); //Hook de arreglo de tareas
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)

  console.warn('task', task)
  console.warn('tasks', tasks)

  const onHandleChangeText = (text) => {
    console.warn('text', text);
    setTask(text);
  }

  const addItem = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), value: task },
    ])
    setTask('')
  }

  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedTask(tasks.find((item) => item.id === id))
  }
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <TouchableOpacity onPress={onHandleDeleteItem(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  )

  const onHandleDeleteItem = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  }
  
  
  return (
    <View style={styles.container}>
      <AddTask 
        item={task}
        onChangeText={onHandleChangeText}
        placeholder='new task'
        addItem={addItem}
        selectionColor='#4A306D'
        placeholderTextColor='#4A306D'
        textButton='ADD'
        color='#4A306D'
      />
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal animationType='slide' visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalle de la lista</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.modalMessage}>¿Estas seguro de que quieres eliminar?</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Eliminar'
            onPress={() => onHandleDeleteItem(selectedTask?.id)}
            color='#4A306D'
          />
          <Button 
            title='Cancelar'
            onPress={() => setModalVisible(!modalVisible)}
            color='#cccccc'
          />
        </View>
      </CustomModal>
    </View>
  );
}


