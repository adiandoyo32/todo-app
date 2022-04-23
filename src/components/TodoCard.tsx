import React from "react";
import { useAppDispatch } from "../app/hooks";
import Todo from "../models/Todo";
import { FormState, setFormState, setTodo } from "../redux/todo-slice";
import TodoStatusBadge from "./TodoStatusBadge";

interface TodoCardProps {
    todo: Todo;
    onClick: () => void;
}

const TodoCard: React.FC<TodoCardProps> = (props) => {
    const dispatch = useAppDispatch();

    return (
        <div className="card w-100 bg-base-100 shadow-xl my-4">
            <div className="card-body">
                <h2 className="card-title">{props.todo.title}</h2>
                <TodoStatusBadge status={props.todo.status} />
                <p className="card-text">{props.todo.description}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary btn-xs"
                        onClick={() => {
                            dispatch(setTodo(props.todo));
                            dispatch(setFormState(FormState.VIEW))
                            props.onClick();
                        }}
                    >
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
