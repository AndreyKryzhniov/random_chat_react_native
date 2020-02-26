import React from 'react'
import {StyleSheet, Text, View} from "react-native";

export const Message = (props) => {
    console.log(props)

    return (
        <View>
            <Text style={props.userId === props.messageObj.item.userId ? styles.my_message : styles.message_friend}>
                {props.messageObj.item.message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    my_message: {
        backgroundColor: '#65A6d1',
        color: 'white',
        borderBottomColor: '#062170',
        borderBottomWidth: 1,
        height: '100%',
        fontSize: 22,
        textAlign: 'right',
        paddingRight: 10,
        paddingBottom: 5
    },
    message_friend: {
        backgroundColor: '#3e97d1',
        color: 'black',
        borderBottomColor: '#062170',
        borderBottomWidth: 1,
        height: '100%',
        fontSize: 22,
        textAlign: 'left',
        paddingLeft: 10,
        paddingBottom: 5

    }
})
