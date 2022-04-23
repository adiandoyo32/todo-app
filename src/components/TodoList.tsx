import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectTodo, setTodoList } from "../redux/todo-slice";
import { loadTodoList } from "../services/todo-service";
import TodoCard from "./TodoCard";

const TodoList = () => {
    const todoState = useAppSelector(selectTodo);
    const dispatch = useAppDispatch();

    const init = async () => {
        const todoList = await loadTodoList();
        dispatch(setTodoList(todoList));
    };

    useEffect(() => {
        init();
        return () => {};
    }, []);

    return (
        <>
            <div className="text-3xl font-bold underline">TodoList</div>
            {todoState.todoList.map((todo, index) => (
                <TodoCard key={index} todo={todo} />
            ))}
        </>
    );
};

export default TodoList;
