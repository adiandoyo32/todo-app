import { axiosIns } from "../libs/axios"
import TodoResponse, { mapTodoResponseToResponse } from "../models/response/TodoResponse"
import Todo from "../models/Todo"

export const loadTodoList = async (): Promise<Todo[]> => {
    const res = await axiosIns.request({
        method: "GET",
        url: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list",
    })
    const response = res.data as TodoResponse[]
    const todoList = response.map((data) =>  mapTodoResponseToResponse(data))
    return todoList
}