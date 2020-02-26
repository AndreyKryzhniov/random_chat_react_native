import React from 'react'
import {StyleSheet, Text, View} from "react-native";

export const Message = (props) => {

    return (
        <View>
            <Text style={props.userId === props.item.id ? styles.my_message : styles.message_friend}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    my_message: {
        backgroundColor: 'black',
        color: 'white'
    },
    message_friend: {
        backgroundColor: 'white',
        color: 'black'
    }
})