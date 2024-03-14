import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const TodoDetailScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>hi</Text>
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

export default TodoDetailScreen;
