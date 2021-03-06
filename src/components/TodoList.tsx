import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormState, resetTodo, selectTodo, setCompletedTodoList, setFormState, setTodoList, setUncompletedTodoList } from "../redux/todo-slice";
import { loadTodoList } from "../services/todo-service";
import PlusIcon from "./PlusIcon";
import TodoCard from "./TodoCard";
import TodoModal, { useModalDialog } from "./TodoModal";

const TodoList = () => {
    const todoState = useAppSelector(selectTodo);
    const dispatch = useAppDispatch();
    const { visible, toggle } = useModalDialog();

    const init = async () => {
        const todoList = await loadTodoList();
        dispatch(setTodoList(todoList));
    };

    useEffect(() => {
        init();
        return () => {};
    }, []);

    useEffect(() => {
        dispatch(setUncompletedTodoList(todoState.todoList));
        dispatch(setCompletedTodoList(todoState.todoList));
    }, [todoState.todoList]);

    return (
        <div className="p-4">
            <div className="flex mt-12 space-x-4 justify-center">
                <div className="text-3xl font-bold">Todo App</div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                        dispatch(resetTodo());
                        dispatch(setFormState(FormState.CREATE));
                        toggle();
                    }}
                >
                    <PlusIcon />
                    Create
                </button>
            </div>

            <div className="flex mb-20">
                <div className="w-1/2 h-12 p-4">
                    <div className="text-2xl font-semibold">Uncomplete Todo</div>
                    {todoState.unCompletedTodoList.map((todo, index) => (
                        <TodoCard key={index} todo={todo} onClick={toggle} />
                    ))}
                </div>
                <div className="w-1/2 h-12 p-4">
                    <div className="text-2xl font-semibold">Completed Todo</div>
                    {todoState.completedTodoList.map((todo, index) => (
                        <TodoCard key={index} todo={todo} onClick={toggle} />
                    ))}
                </div>
            </div>

            <TodoModal visible={visible} toggle={toggle} />
        </div>
    );
};

export default TodoList;
