import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StartPage} from "./src/UI/StartPage";
import {Provider} from 'react-redux'
import store from "./src/BLL/store";

export default function App() {


    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StartPage title={'GO'}/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
