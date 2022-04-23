import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import Todo from "../models/Todo";

export interface TodoState {
    todoList: Todo[];
    todo: Todo;
}

const initialState: TodoState = {
    todoList: [],
    todo: {
        id: 0,
        title: "",
        description: "",
        status: 0,
        createdAt: "",
    },
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoList: (state, { payload }: PayloadAction<Todo[]>) => {
            state.todoList = payload;
        },
    },
});

export const { setTodoList } = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;