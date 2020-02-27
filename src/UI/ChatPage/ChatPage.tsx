import React, {useState, useEffect} from 'react';
import {
    Alert,
    Button,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageTC, getMessagesTC} from "../../BLL/usersReducer";
import {AppStateType} from "../../BLL/store";
import {Message} from "../Message";

export const ChatPage = () => {
    let {chatId, messages, isLoading, userId} = useSelector((store: AppStateType) => store.users);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const ref = React.createRef<FlatList<any>>();

    const logOutOfChat = () => {
        dispatch(sendMessageTC('1qaz2wsx3edc'))
    };

    useEffect(() => {
        if (chatId && !isLoading)
            setTimeout(() => {
                dispatch(getMessagesTC())
            }, 1500)
    }, [isLoading, chatId]);

    useEffect(() => {
        setTimeout(() => ref.current && ref.current.scrollToEnd(), 100)
    }, [messages])

    const sendMessage = () => {
        if (!(value.length === 0)) {
            setValue('');
            dispatch(sendMessageTC(value))
        } else {
            Alert.alert('Вы попытались отправить пустое сообщение')
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View  style={styles.container}><View style={styles.button_out}>
                <Button title={'UOT'} onPress={logOutOfChat} color={'#0D58A6'}/>
            </View>
                <View style={styles.list}>
                    <FlatList
                        ref={ref}
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
                    <Button title={'SEND'} onPress={sendMessage} color={'#0D58A6'}/>
                </View></View>
        </KeyboardAvoidingView>
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
        borderBottomColor: '#3949ab',
        marginRight: 10
    },
    list: {
        height: '80%',
        borderTopColor: '#0D58A6',
        borderTopWidth: 1,
        borderBottomColor: '#0D58A6',
        borderBottomWidth: 1,
        width: '100%'
    }
});
