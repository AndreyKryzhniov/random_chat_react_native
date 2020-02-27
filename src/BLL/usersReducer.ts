import {Dispatch} from "redux";
import {api, IMessage} from '../API/api'
import {AppStateType} from "./store";

const SET_USER = 'SET_USER'
const SET_USER_IN_CHAT = 'SET_USER_IN_CHAT'
const SET_MESSAGES = 'SET_MESSAGES'
const SET_IS_LOADING = 'SET_IS_LOADING'

interface IUserState {
    userId: number
    isFetching: boolean
    chatId: number
    messages: IMessage[]
    isLoading: boolean
}

interface IActionSetUser {
    type: typeof SET_USER
    userId: number
    status: string
}

interface IActionUserSetInChat {
    type: typeof SET_USER_IN_CHAT
    status: string
    chatId: number
}

interface IActionUserSetMessages {
    type: typeof SET_MESSAGES
    status: string
    messages: IMessage[]
}

interface IActionUserSetIsLoading {
    type: typeof SET_IS_LOADING
    isLoading: boolean
}


const initialState: IUserState = {
    userId: 0,
    isFetching: false,
    chatId: 0,
    messages: [],
    isLoading: false,
}

type IActions = IActionSetUser | IActionUserSetInChat | IActionUserSetMessages | IActionUserSetIsLoading


const usersReducer = (state: IUserState = initialState, action: IActions): IUserState => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                userId: action.userId,
                isFetching: action.status === 'wait',
                isLoading: action.userId === 0,
                messages: [],
            }
        }
        case SET_USER_IN_CHAT: {
            return {
                ...state,
                chatId: action.chatId,
                isLoading: action.chatId === 0,
                isFetching: !(action.status === 'found' || action.status === '1qaz2wsx3edc'),
            }
        }
        case SET_MESSAGES: {
            return {
                ...state,
                messages: action.messages.length ? [...state.messages, ...action.messages] : state.messages,
                isLoading: false
            }
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
    }
    return state
}


export const postUser = (userId: number, status: string): IActionSetUser => ({type: SET_USER, userId, status})
const setIsLoading = (isLoading: boolean): IActionUserSetIsLoading => ({type: SET_IS_LOADING, isLoading})
const setUserInChat = (status: string, chatId: number): IActionUserSetInChat => ({
    type: SET_USER_IN_CHAT,
    status,
    chatId
})
const setMessages = (status: string, messages: IMessage[]): IActionUserSetMessages => ({
    type: SET_MESSAGES,
    status,
    messages
})

export const setUserTC = () => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        dispatch(postUser(0, 'wait'))
        api.setUser().then(response => {
            getState().users.isFetching && dispatch(postUser(response.data.userId, response.data.status))
        })
    }
}

export const getUserTC = () => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        if (getState().users.isFetching) {
            dispatch(setUserInChat('wait', 0))
            api.getUser(getState().users.userId).then(response => {
                getState().users.isFetching && dispatch(setUserInChat(response.data.status, response.data.chatId))
            })
        }
    }
}

export const getMessagesTC = () => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const users = getState().users;
        const date = !!users.messages.length ? users.messages[users.messages.length - 1].date : 0;
        dispatch(setIsLoading(true))
        api.getMessages(users.userId, users.chatId, date)
            .then(response => {
                dispatch(setMessages(response.data.status, response.data.messages))
            })
    }
}

export const sendMessageTC = (message: string) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const users = getState().users;
        api.sendMessage(users.userId, users.chatId, message).then(response => {
            {
                message === '1qaz2wsx3edc' && dispatch(setUserInChat('1qaz2wsx3edc', 0))
            }
            // dispatch(setUserInChat(response.data.status, response.data.chatId))
        })
    }
}

export default usersReducer
