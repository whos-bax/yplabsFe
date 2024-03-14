import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import {ItemProps} from './TodoList.tsx';
import dayjs from 'dayjs';

const TodoDetail = (item: ItemProps): React.JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.todoDetailView}>
        <Switch
          style={styles.todoToggle}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.dateView}>
          <Text style={styles.grayFont}>
            작성 시간: {dayjs(item.create_at).format('YYYY. MM. DD HH:mm')}
          </Text>
          <Text style={styles.grayFont}>
            수정 시간: {dayjs(item.update_at).format('YYYY. MM. DD HH:mm')}
          </Text>
        </View>
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
  todoToggle: {
    marginLeft: 'auto',
    marginBottom: 20,
  },
  todoDetailView: {
    padding: 20,
  },
  dateView: {
    marginTop: 20,
  },
  grayFont: {
    textAlign: 'right',
    fontSize: 14,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    backgroundColor: '#f1f3f5',
    padding: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default TodoDetail;
