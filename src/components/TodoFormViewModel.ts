import { useState } from "react";
import * as Yup from "yup";
import { useAppSelector } from "../app/hooks";
import { selectTodo } from "../redux/todo-slice";

export interface TodoFormField {
    title: string;
    description: string;
    status: number;
}

export default function useTodoFormViewModel() {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const todoState = useAppSelector(selectTodo);

    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string(),
        status: Yup.number(),
    });

    let initialValues: TodoFormField = {
        title: todoState.todo.title ?? "",
        description: todoState.todo.description ?? "",
        status: todoState.todo.status ?? 0,
    };

    return {
        initialValues,
        schema,
        isEdit,
        setIsEdit,
    };
}
