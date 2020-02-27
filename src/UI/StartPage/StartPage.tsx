import React, {useEffect} from 'react'
import {Button, StyleSheet, View, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, postUser, setUserTC} from '../../BLL/usersReducer';
import { AppStateType } from '../../BLL/store';
import {ChatPage} from "../ChatPage/ChatPage";

interface IProps {
    title: string
}

export const StartPage = (props: IProps) => {

    let {isFetching, chatId, isLoading} = useSelector((store: AppStateType) => store.users);
    const dispatch = useDispatch();

    const startSearching = () => {
        dispatch(setUserTC())
    }
    const stop = () => {
        dispatch(postUser(0, 'stop'))
    }

    useEffect(() => {
        if (isFetching && !isLoading) {
            setTimeout(() => {
                dispatch(getUserTC())
            }, 1500)
        }
    }, [isFetching, isLoading]);

    if (chatId) {
        return <ChatPage/>
    }

    return (
        <View style={styles.container}>
            {
                isFetching
                    ? (
                        <View style={styles.fetchingContainer}>
                            <ActivityIndicator size={80} color="#0D58A6" />
                            <Button title={'Stop'} onPress={stop}/>
                        </View>

                    )
                    : <Button title={props.title} color={'#0D58A6'} onPress={startSearching}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '65%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    fetchingContainer: {
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
});
