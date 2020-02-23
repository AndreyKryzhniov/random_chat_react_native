import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

export default function App() {

  let [value, setValue] = useState('новый текст')

  return (
    <View style={styles.container}>
      <TextInput
          style={{width: 40}}
          placeholder={'Type here.'}
          value={value}
          onChangeText={(text) => setValue(text)}
      />
      <Text style={{padding: 10, fontSize: 25}}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
