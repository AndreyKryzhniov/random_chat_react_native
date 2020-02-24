import React, {useEffect} from 'react'
import {Button, StyleSheet, View, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, setUserTC} from '../BLL/usersReducer';
import { AppStateType } from '../BLL/store';
import {ChatPage} from "./ChatPage";

interface IProps {
    title: string
}

export const StartPage = (props: IProps) => {

    let {isFetching, chatId, isLoading} = useSelector((store: AppStateType) => store.users)
    const dispatch = useDispatch()

    const startSearching = () => {
        dispatch(setUserTC())
    }

    useEffect(() => {
        if (isFetching && !isLoading) {
            setTimeout(() => {
                dispatch(getUserTC())
            }, 1500)
        }
    }, [isFetching, isLoading])

    if (chatId) {
        return <ChatPage/>
    }

    return (
        <View style={styles.container}>
            {
                isFetching ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title={props.title} onPress={startSearching}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '60%',
        justifyContent: 'center',
        alignContent: 'center'
    },
});