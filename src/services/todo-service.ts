import { axiosIns } from "../libs/axios"
import Todo from "../models/Todo"

export const loadTodoList = async (): Promise<Todo[]> => {
    const res = await axiosIns.request({
        method: "GET",
        url: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list",
    })
    return res.data
}