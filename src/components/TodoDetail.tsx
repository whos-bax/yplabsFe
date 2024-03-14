import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ItemProps} from './TodoList.tsx';

const TodoDetail = (item: ItemProps): React.JSX.Element => {
  console.log(item);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{item.content}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
});

export default TodoDetail;
