import React, {useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

export default function TodosContainer() {

    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const onCreate = text => dispatch(addTodo(text));
    const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]); 
    // 최적화를 위해 useCallback 사용
    // useCallback : 리렌더링마다 함수가 재선언 되는데 이렇게 하지 않고 재사용할 수 잇게 함
    
    return (
        <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
    );
}