import Todo from "../Todo";

export default interface TodoResponse {
    id: number;
    title: string;
    description: string;
    status: 0;
    createdAt: string;
}

export const mapTodoResponseToResponse = (response: TodoResponse): Todo => {
    return {
        id: response.id,
        title: response.title,
        description: response.description,
        status: response.status,
        createdAt: new Date(response.createdAt).toString(),
    };
};
