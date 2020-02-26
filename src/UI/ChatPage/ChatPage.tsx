import React, {useState, useEffect} from 'react';
import {Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageTC, getMessagesTC} from "../../BLL/usersReducer";
import {AppStateType} from "../../BLL/store";
import {Message} from "../Message";

interface IMessage {
    message: string,
    id: number
}

interface IMessages {
    messages: IMessage[]
}


export const ChatPage = () => {

    let {chatId, messages, isLoading, userId} = useSelector((store: AppStateType) => store.users)

    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const logOutOfChat = () => {
        dispatch(sendMessageTC('1qaz2wsx3edc'))
    }

    useEffect(() => {
        if (chatId && !isLoading)
            setTimeout(() => {
                dispatch(getMessagesTC())
            }, 1500)
    }, [isLoading, chatId])

    const sendMessage = () => {
        if (!(value.length === 0)) {
            setValue('')
            dispatch(sendMessageTC(value))
        } else {
            Alert.alert('Вы попытались отправить пустое сообщение')
        }
    }

    // let messagesArray = messages.map(m => m)


    return (
        <View style={styles.container}>
            <View style={styles.button_out}>
                <Button title={'UOT'} onPress={logOutOfChat}/>
            </View>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={messages}
                    renderItem={(item) => <Message messageObj={item} userId={userId}/>}
                />
            </View>
            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={'Введите сообщение...'}
                    onChangeText={setValue}/>
                <Button title={'SEND'} onPress={sendMessage}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    button_out: {
        marginTop: 25,
        width: '40%'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginBottom: 10
    },
    input: {
        width: '80%',
        padding: 5,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBColorColor: '#3949ab',
        marginRight: 10,
        onBlur: false
    },
    list: {
        height: '40%'
    }
});
