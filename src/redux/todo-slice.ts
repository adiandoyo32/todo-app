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
    todo: Todo;
}

const initialState: TodoState = {
    formState: FormState.CREATE,
    todoList: [],
    completedTodoList: [],
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
        setCompletedTodo: (state, { payload }: PayloadAction<Todo[]>) => {
            // const completed = payload.map((todo) => {
            //     if (todo.status == 1) return todo;
            // });
            // const temp = completed.sort((a, b) => a!.createdAt!.getTime() - b!.createdAt!.getTime());
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
                createdAt: generateCreateAt(),
                // createdAt: new Date(),
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

export const { setTodoList, setCompletedTodo, setTodo, addTodo, editTodo, deleteTodo, resetTodo, setFormState } =
    todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
