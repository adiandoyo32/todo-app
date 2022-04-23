import React from "react";
import Todo from "../models/Todo";

interface TodoCardProps {
    todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = (props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl my-4">
            <div className="card-body">
                <h2 className="card-title">{props.todo.title}</h2>
                <p>{props.todo.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary"></button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
