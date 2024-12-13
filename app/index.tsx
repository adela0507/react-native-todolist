import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "../components/Header/Header";
import {CardToDo} from "../components/CardToDo/CardToDo";


const TODO_LIST=[
  {id:1, title:"Walk the dog", isCompleted:true},
  {id:2, title:"Go to the dentist", isCompleted:true},
  {id:3, title:"LearnReactNative", isCompleted:true},
];



export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header/>
          </View>
          <View style={s.body}>
            <CardToDo todo={TODO_LIST[0]}/>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}