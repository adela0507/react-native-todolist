import { TouchableOpacity,Text,Image } from "react-native"
import {s} from"./CardToDo.style"
import checkImg from "../../assets/images/check.png"

export function CardToDo({todo,onPress}){
    return <TouchableOpacity style={s.card} onPress={()=>onPress(todo)}>
        <Text style={[s.title, todo.isCompleted &&{textDecorationLine:"line-through"}]}>{todo.title}</Text>
        {todo.isCompleted && <Image style={s.img} source={checkImg}/>}
    </TouchableOpacity>
};