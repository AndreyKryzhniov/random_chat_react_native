import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {sendMessageTC} from "../BLL/usersReducer";


export const ChatPage = () => {

    const [message, newMessage] = useState('')

    const dispatch = useDispatch()

    const logOutOfChat = () => {
        dispatch(sendMessageTC('1qaz2wsx3edc'))
    }

    const changeMessage = (text) => {
        newMessage(text)
    }

    const sendMessage = () => {
        if (!(message.length === 0)) {
            newMessage('')
            dispatch(sendMessageTC(message))
        }
    }

    return (
        <View>
            <Text>HELLO</Text>
            <TextInput style={styles.text} value={message} onChangeText={changeMessage}/>
            <View style={styles.buttons}><Button title={'SEND MESSAGE'} onPress={sendMessage}/></View>
            <View style={styles.buttons}><Button title={'UOT'} onPress={logOutOfChat}/></View>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    buttons: {
        margin: 5
    }
});