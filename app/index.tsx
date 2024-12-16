import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "../components/Header/Header";
import {CardToDo} from "../components/CardToDo/CardToDo";
import {TopBottomMenu} from "../components/TopBottomMenu/TopBottomMenu";
import { useState } from "react";

export default function App() {

  const[todoList, setToDoList]=useState([
    { id: 1, title: "Walk the dog", isCompleted: true },
    { id: 2, title: "Go to the dentist", isCompleted: false },
    { id: 3, title: "Learn React Native", isCompleted: false },
    { id: 5, title: "Go to the dentist", isCompleted: false },
    { id: 6, title: "Learn React Native", isCompleted: false },
    { id: 7, title: "Walk the dog", isCompleted: true },
    { id: 8, title: "Go to the dentist", isCompleted: false },
    { id: 9, title: "Learn React Native", isCompleted: false },
  ]);

const [selectedTabName, setSelectedTabName]=useState("all");

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

function deleteTodo(todoToDelete){
Alert.alert("Delete todo", "Are you sure you want to delete this todo?",
  [
    {text:"Delete", style:"destructive", onPress:()=>{
      setToDoList(todoList.filter(t =>t.id !== todoToDelete.id));
    }},
    {text:"Cancel", style:"cancel", },
  ]
);
}

function renderTodoList(){
  return getFilteredList().map((todo)=>
  <View key={todo.id} style={s.cardItem}>
    <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo}/>
  </View> )
}

function updateTodo(todo){
  const updatedTodo={
    ...todo, isCompleted: !todo.isCompleted
  };
  const updatedTodoList=[...todoList]
  const indexUpdatedTodo=updatedTodoList.findIndex(
    t=>t.id==updatedTodo.id);
    updatedTodoList[indexUpdatedTodo]=updatedTodo;
    setToDoList(updatedTodoList);
}

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header/>
          </View>
          <View style={s.body}>
            <ScrollView>
            {renderTodoList()}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TopBottomMenu 
        todoList={todoList}
        onPress={setSelectedTabName} selectedTabName={selectedTabName} />
      </View>
    </>
  );
}