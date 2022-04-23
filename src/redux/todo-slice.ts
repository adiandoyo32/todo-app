import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TodoFormField } from "../components/TodoFormViewModel";
import Todo from "../models/Todo";

export enum FormState {
    CREATE = "ADD",
    EDIT = "EDIT",
    VIEW = "VIEW",
}

export interface TodoState {
    formState: FormState.CREATE | FormState.EDIT | FormState.VIEW;
    todoList: Todo[];
    completedTodoList: Todo[];
    unCompletedTodoList: Todo[];
    todo: Todo;
}

const initialState: TodoState = {
    formState: FormState.CREATE,
    todoList: [],
    completedTodoList: [],
    unCompletedTodoList: [],
    todo: {
        id: 0,
        title: "",
        description: "",
        status: 0,
        createdAt: "",
    },
};

const findTodoIndex = (todoList: Todo[], id: number): number => {
    return todoList.findIndex((todo) => todo.id == id);
};

const generateCreateAt = () => {
    const date = new Date();
    var day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var time = date.getHours() + ":" + date.getMinutes();
    return day + " " + time;
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        resetTodo: (state) => {
            state.todo = {
                ...initialState.todo,
            };
        },
        setUncompletedTodoList: (state, { payload }: PayloadAction<Todo[]>) => {
            const uncompleted = payload.filter((todo) => todo.status == 0);
            const sorted = uncompleted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            state.unCompletedTodoList = sorted;
        },
        setCompletedTodoList: (state, { payload }: PayloadAction<Todo[]>) => {
            const completed = payload.filter((todo) => todo.status == 1);
            const sorted = completed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            state.completedTodoList = sorted;
        },
        setFormState: (state, action: PayloadAction<FormState>) => {
            state.formState = action.payload;
        },
        setTodoList: (state, { payload }: PayloadAction<Todo[]>) => {
            state.todoList = payload;
        },
        setTodo: (state, { payload }: PayloadAction<Todo>) => {
            state.todo = payload;
        },
        addTodo: (state, { payload }: PayloadAction<TodoFormField>) => {
            const newTodo: Todo = {
                ...payload,
                id: Date.now(),
                // createdAt: generateCreateAt(),
                createdAt: new Date().toString(),
            };
            state.todoList.push(newTodo);
        },
        editTodo: (state, { payload }: PayloadAction<Todo>) => {
            const index = findTodoIndex(state.todoList, payload.id);
            state.todoList[index] = payload;
        },
        deleteTodo: (state, { payload }: PayloadAction<number>) => {
            const index = findTodoIndex(state.todoList, payload);
            state.todoList.splice(index, 1);
        },
    },
});

export const { setTodoList, setCompletedTodoList, setUncompletedTodoList, setTodo, addTodo, editTodo, deleteTodo, resetTodo, setFormState } =
    todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
