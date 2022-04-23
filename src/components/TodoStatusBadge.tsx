import React from "react";

interface TodoStatusBadgeProps {
    status: number;
}

const TodoStatusBadge: React.FC<TodoStatusBadgeProps> = (props) => {
    if (props.status == 1) {
        return <span className="badge badge-success">Completed</span>;
    } else {
        return <span className="badge badge-danger">Uncomplete</span>;
    }
};

export default TodoStatusBadge;
