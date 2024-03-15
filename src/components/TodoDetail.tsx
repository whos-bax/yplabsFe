import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {TodoDetailPropsType} from '../pages/TodoDetailScreen.tsx';
import TodoStatusComponent from './TodoStatusComponent.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/rootReducer.ts';

const TodoDetail = ({
  item,
  handleToggleSwitch,
  todoStatusProps,
}: TodoDetailPropsType): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.common.loading);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.todoDetailView}>
        <View style={styles.todoToggleView}>
          <Text
            style={[
              styles.todoToggleText,
              item.is_finished && styles.todoToggleTextActive,
            ]}>
            {item.is_finished ? '완료' : '미완료'}
          </Text>
          <Switch
            trackColor={{false: 'gray', true: '#3d67fc'}}
            thumbColor={'white'}
            onValueChange={handleToggleSwitch}
            value={item.is_finished || false}
            disabled={isLoading}
          />
        </View>
        <View>
          <Text style={styles.content}>{item.content}</Text>
          <TodoStatusComponent item={item} todoStatusProps={todoStatusProps} />
        </View>

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
  todoDetailView: {
    padding: 20,
  },
  todoToggleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    gap: 10,
  },
  todoToggleText: {
    fontSize: 16,
  },
  todoToggleTextActive: {
    color: '#3d67fc',
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
