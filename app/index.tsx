import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "../components/Header/Header";
import { CardToDo } from "../components/CardToDo/CardToDo";
import { useEffect, useRef, useState } from "react";
import { TopBottomMenu } from "../components/TopBottomMenu/TopBottomMenu";
import { ButtonAdd } from "../components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstrENDER=true;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef=useRef();

  useEffect(()=>{
    loadTodoList();
  },[]);

  useEffect(()=>{
    if(!isFirstrENDER){
    saveTodoList();
  }
    else {
      isFirstrENDER=false;
    }
  },[todoList]);

  async function loadTodoList(){
    try{
     const todoListString= await AsyncStorage.getItem("@todoList");
     const parsedTodoList=JSON.parse(todoListString);
     setTodoList(parsedTodoList || []);

    }catch(err){
      alert(err);
    }
  }

  async function saveTodoList(){
    try{
      await AsyncStorage.setItem("@todoList",JSON.stringify(todoList))

    }catch(err){
      alert(err);
    }

  }

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todoToDelete) {
    Alert.alert("Delete todo", "Are you sure you want to delete this todo ?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      (t) => t.id === updatedTodo.id
    );
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue("");
    setTimeout(()=>{
      scrollViewRef.current.scrollToEnd()
    },300);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          onChangeText={setInputValue}
          placeholder="Ex : Go to the dentist"
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView ref={scrollViewRef} >{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TopBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}