import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StartPage} from "./src/UI/StartPage/StartPage";
import {Provider} from 'react-redux'
import store from "./src/BLL/store";
// import {ChatPage} from "./src/UI/ChatPage/ChatPage";

export default function App() {


    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StartPage title={'FIND A CHAT'}/>
                {/*<ChatPage/>*/}
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bcbda6'
    },
});
