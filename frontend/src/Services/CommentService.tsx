import axios from "axios"
import { CommentGet, CommentPost } from "../Models/Comment"
import { handleError } from "../Helpers/ErrorHandler"

const api = "http://localhost:5022/api/comment/"

export const postCommentAPI = async(title: string, content: string, id: number) => {
    try{
        const data = await axios.post<CommentPost>(api + `${id}`, {
            title: title,
            content: content,
        })
        return data;
    } catch (error) {
        handleError(error);
    }
}
export const getCommentAPI = async(name: string) => {
    try{
        const data = await axios.get<CommentGet[]>(api + `?Name=${name}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}