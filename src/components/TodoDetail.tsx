import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ItemProps} from './TodoList.tsx';
import dayjs from 'dayjs';

const TodoDetail = (item: ItemProps): React.JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.todoDetailView}>
        <Text style={styles.grayFont}>
          작성 시간: {dayjs(item.create_at).format('YYYY. MM. DD HH:mm')}
        </Text>
        <Text style={styles.grayFont}>
          수정 시간: {dayjs(item.update_at).format('YYYY. MM. DD HH:mm')}
        </Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  todoDetailView: {
    padding: 20,
  },
  grayFont: {
    textAlign: 'right',
    fontSize: 14,
    color: 'gray',
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#f1f3f5',
    padding: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default TodoDetail;
