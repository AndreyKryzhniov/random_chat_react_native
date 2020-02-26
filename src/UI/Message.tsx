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
        backgroundColor: 'black',
        color: 'white'
    },
    message_friend: {
        backgroundColor: 'white',
        color: 'black'
    }
})
