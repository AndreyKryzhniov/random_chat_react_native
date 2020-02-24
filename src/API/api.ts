import axios from "axios"

const instance = axios.create({
    baseURL: "https://vast-sands-32724.herokuapp.com/",
})

export type IMessage = {
    message: string;
    userId: number;
    date: number;
}

export const api ={
    setUser () {
        return instance.post<{userId: number, status: string}>('user')
    },
    getUser (userId: number) {
        return instance.get<{chatId: number, status: string}>(`user?userId=${userId}`)
    },
    getMessages (userId: number, chatId: number, lastMessageDate: number) {
        return instance.get<{messages: IMessage[], status: string}>(`message?userId=${userId}&chatId=${chatId}&date=${lastMessageDate}`)
    },
    sendMessage (userId: number, chatId: number, message: string) {
        return instance.post<{status: string}>('message', {userId, chatId, message})
    },
}
